import { MultiPurpose } from './multi-purpose';
import { Partner } from './partner';
import { Agent } from './agent';

export class HomePageResponse {
  mainText: string;
  multiPurposeSection1: MultiPurpose;
  multiPurposeSection2: MultiPurpose;
  multiPurposeSection3: MultiPurpose;
  multiPurposeSection4: MultiPurpose;
  partners: Partner[];
  agents: Agent[];
}
