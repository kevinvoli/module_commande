import { Produits } from "src/produit/entities/produit.entity";
import { Rangements } from "src/rangements/entities/rangement.entity";
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


export enum typeMouvement {
  entree= "entrée",
  sortie = "sortie"
}

@Index("produit_id", ["produitId"], {})
@Index("rangement_id", ["rangementId"], {})
@Entity("mouvements_stock", { schema: "gestion_stock" })
export class MouvementsStock {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "produit_id", nullable: true })
  produitId: number | null;

  @Column("enum", {
    name: "type_mouvement",
    nullable: true,
    enum: typeMouvement,
  })
  typeMouvement: typeMouvement;

  @Column("int", { name: "quantite" })
  quantite: number;

  @Column("datetime", {
    name: "date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date | null;

  @Column("int", { name: "rangement_id", nullable: true })
  rangementId: number | null;

  @ManyToOne(() => Produits, (produits) => produits.mouvementsStocks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "produit_id", referencedColumnName: "id" }])
  produit: Produits;

  @ManyToOne(() => Rangements, (rangements) => rangements.mouvementsStocks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "rangement_id", referencedColumnName: "id" }])
  rangement: Rangements;
  
  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
