import { Column, Entity, Index } from "typeorm";

@Index("index_users_roles_on_user_id_and_role_id", ["roleId", "userId"], {})
@Index("index_users_roles_on_role_id", ["roleId"], {})
@Index("index_users_roles_on_user_id", ["userId"], {})
@Entity("users_roles", { schema: "public" })
export class UsersRoles {
  @Column("bigint", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("bigint", { name: "role_id", nullable: true })
  roleId: string | null;
}
