import { Categories } from "src/categorie/entities/categorie.entity";
import { MouvementsStock } from "src/mouvements_stock/entities/mouvements_stock.entity";
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


@Index("categorie_id", ["categorieId"], {})
@Entity("produits", { schema: "gestion_stock" })
export class Produits {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "categorie_id", nullable: true })
  categorieId: number | null;

  @Column("int", { name: "stock_actuel" })
  stockActuel: number;

  @Column("int", { name: "seuil_alerte" })
  seuilAlerte: number;

  // @OneToMany(
  //   () => DetailsCommandes,
  //   (detailsCommandes) => detailsCommandes.produit
  // )
  // detailsCommandes: DetailsCommandes[];

  @OneToMany(
    () => MouvementsStock,
    (mouvementsStock) => mouvementsStock.produit
  )
  mouvementsStocks: MouvementsStock[];

  // @OneToMany(() => Notifications, (notifications) => notifications.produit)
  // notifications: Notifications[];

  @ManyToOne(() => Categories, (categories) => categories.produits, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categorie_id", referencedColumnName: "id" }])
  categorie: Categories;

   @CreateDateColumn({type:'datetime',  name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({type:'datetime', name: 'updated_at'})
    updatedAt: Date;
  
    @DeleteDateColumn({type:'datetime', name: 'delected_at'})
    delectedAt:Date;
}
