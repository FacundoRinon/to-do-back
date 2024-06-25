import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(user: string, password: string): Promise<any> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: user }, { email: user }],
      },
    });

    if (!foundUser) {
      return 'Invalid credentials';
    }
    if (!(await bcrypt.compare(password, foundUser.password))) {
      return 'Invalid credentials';
    }
    const token = jwt.sign(
      {
        user,
      },
      process.env.SESSION_SECRET,
    );

    const log = {
      token,
      id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
    };

    return log;
  }

  async create(data: any) {
    const { username, email, password, confirmPass } = data;

    const unavailableUser = await this.prisma.user.findUnique({
      where: { username },
    });

    const unavailableEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    const passMatch = password === confirmPass;

    if (unavailableUser || unavailableEmail) {
      return 'Username or Email already exists';
    } else if (!passMatch) {
      return 'Passwords are not the same';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        username,
      },
      process.env.SESSION_SECRET,
    );

    const userCreate = {
      token,
      id: newUser.user_id,
      username,
      email,
    };

    return userCreate;
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { user_id: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { user_id: id },
    });
  }
}
