import { Rayons } from "src/rayons/entities/rayon.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("entrepots", { schema: "gestion_stock" })
export class Entrepots {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("text", { name: "adresse", nullable: true })
  adresse: string | null;

  @OneToMany(() => Rayons, (rayons) => rayons.entrepot)
  rayons: Rayons[];

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
