import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
  async findByEmail(email: string) {
    return this.findOne({ where: { email: email } });
  }
}
