import { Clients } from "src/client/entities/client.entity";
import { DetailsCommandes } from "src/details_commande/entities/details_commande.entity";
import { Fournisseurs } from "src/fournisseur/entities/fournisseur.entity";
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


@Index("client_id", ["clientId"], {})
@Index("fournisseur_id", ["fournisseurId"], {})
@Entity("commandes", { schema: "gestion_stock" })
export class Commandes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", {
    name: "type_commande",
    nullable: true,
    enum: ["achat", "vente"],
  })
  typeCommande: "achat" | "vente" | null;

  @Column("datetime", {
    name: "date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date | null;

  @Column("varchar", { name: "statut", nullable: true, length: 50 })
  statut: string | null;

  @Column("int", { name: "client_id", nullable: true })
  clientId: number | null;

  @Column("int", { name: "fournisseur_id", nullable: true })
  fournisseurId: number | null;

  @ManyToOne(() => Clients, (clients) => clients.commandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Clients;

  @ManyToOne(() => Fournisseurs, (fournisseurs) => fournisseurs.commandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "fournisseur_id", referencedColumnName: "id" }])
  fournisseur: Fournisseurs;

  @OneToMany(
    () => DetailsCommandes,
    (detailsCommandes) => detailsCommandes.commande
  )
  detailsCommandes: DetailsCommandes[];

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
