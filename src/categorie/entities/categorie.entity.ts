import { Produits } from "src/produit/entities/produit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Index("parent_id", ["parentId"], {})
@Entity("categories", { schema: "gestion_stock" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100,nullable:false ,})
  nom: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @ManyToOne(() => Categories, (categories) => categories.categories, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Categories;

  @OneToMany(() => Categories, (categories) => categories.parent)
  categories: Categories[];

  @OneToMany(() => Produits, (produits) => produits.categorie)
  produits: Produits[];

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
  
}
