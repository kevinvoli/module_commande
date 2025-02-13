import { Entrepots } from "src/entrepots/entities/entrepot.entity";
import { Rangements } from "src/rangements/entities/rangement.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Index("entrepot_id", ["entrepotId"], {})
@Entity("rayons", { schema: "gestion_stock" })
export class Rayons {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("int", { name: "entrepot_id", nullable: true })
  entrepotId: number | null;

  @OneToMany(() => Rangements, (rangements) => rangements.rayon)
  rangements: Rangements[];

  @ManyToOne(() => Entrepots, (entrepots) => entrepots.rayons, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "entrepot_id", referencedColumnName: "id" }])
  entrepot: Entrepots;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
