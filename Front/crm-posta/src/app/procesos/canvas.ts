import { Channels } from "./Channels";
import { CustomerRelationships } from "./CustomerRelationships";
import { CustomerSegments } from "./CustomerSegments";
import { KeyActivities } from "./KeyActivities";
import { KeyPartners } from "./KeyPartners";
import { KeyRecources } from "./KeyRecources";
import { RevenueStreams } from "./RevenueStreams";
import { ValuePropositions } from "./ValuePropositions";
import { CostStructure } from './CostStructure';

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


}

