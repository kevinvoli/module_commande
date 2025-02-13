import { MouvementsStock } from "src/mouvements_stock/entities/mouvements_stock.entity";
import { Rayons } from "src/rayons/entities/rayon.entity";
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


@Index("rayon_id", ["rayonId"], {})
@Entity("rangements", { schema: "gestion_stock" })
export class Rangements {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("int", { name: "rayon_id", nullable: true })
  rayonId: number | null;

  @OneToMany(
    () => MouvementsStock,
    (mouvementsStock) => mouvementsStock.rangement
  )
  mouvementsStocks: MouvementsStock[];

  @ManyToOne(() => Rayons, (rayons) => rayons.rangements, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "rayon_id", referencedColumnName: "id" }])
  rayon: Rayons;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
