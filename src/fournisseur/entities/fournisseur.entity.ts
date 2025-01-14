import { Commandes } from "src/commande/entities/commande.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("fournisseurs", { schema: "gestion_stock" })
export class Fournisseurs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("text", { name: "adresse", nullable: true })
  adresse: string | null;

  @Column("varchar", { name: "contact", nullable: true, length: 50 })
  contact: string | null;

  @OneToMany(() => Commandes, (commandes) => commandes.fournisseur)
  commandes: Commandes[];

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
