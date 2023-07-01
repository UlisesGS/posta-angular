import { Channels } from "./Channels";
import { CustomerRelationships } from "./CustomerRelationships";
import { CustomerSegments } from "./CustomerSegments";
import { KeyActivities } from "./KeyActivities";
import { KeyPartners } from "./KeyPartners";
import { KeyRecources } from "./KeyRecources";
import { RevenueStreams } from "./RevenueStreams";
import { ValuePropositions } from "./ValuePropositions";
import { CostStructure } from './CostStructure';
import { Client } from "../client/client";

export class Canvas {
  id:number;
  customerSegments:CustomerSegments;
  valuePropositions:ValuePropositions;
  channels:Channels;
  customerRelationships:CustomerRelationships;
  keyRecources:KeyRecources;
  keyActivities:KeyActivities;
  keyPartners:KeyPartners;
  revenueStreams:RevenueStreams;
  costStructure:CostStructure;
  client:Client;
/*
private Long id;
    @OneToOne
    private CustomerSegments customerSegments;
    @OneToOne
    private ValuePropositions valuePropositions;
    @OneToOne
    private Channels channels;
    @OneToOne
    private CustomerRelationships customerRelationships;
    @OneToOne
    private KeyRecources keyRecources;
    @OneToOne
    private KeyActivities keyActivities;
    @OneToOne
    private KeyPartners keyPartners;
    @OneToOne
    private RevenueStreams revenueStreams;
    @OneToOne
    private CostStructure costStructure;
    @OneToOne
    private Client client;

*/
}

