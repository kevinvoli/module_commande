import { Commandes } from "src/commande/entities/commande.entity";
import { Produits } from "src/produit/entities/produit.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Index("commande_id", ["commandeId"], {})
@Index("produit_id", ["produitId"], {})
@Entity("details_commandes", { schema: "gestion_stock" })
export class DetailsCommandes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "commande_id", nullable: true })
  commandeId: number | null;

  @Column("int", { name: "produit_id", nullable: true })
  produitId: number | null;

  @Column("int", { name: "quantite" })
  quantite: number;

  @Column("decimal", { name: "prix_unitaire", precision: 10, scale: 2 })
  prixUnitaire: string;

  @ManyToOne(() => Commandes, (commandes) => commandes.detailsCommandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "commande_id", referencedColumnName: "id" }])
  commande: Commandes;

  @ManyToOne(() => Produits, (produits) => produits.detailsCommandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "produit_id", referencedColumnName: "id" }])
  produit: Produits;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
