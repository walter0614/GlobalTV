import { Injectable } from '@angular/core';
import { Sequence } from '../models/sequence.model';
import { SequenceService } from '../services/sequence.service';

@Injectable()
export class SequenceBusinessService {

    sequenceList: Sequence[];

    constructor(private sequenceService: SequenceService) { }

    getSequenceByHistory(idHistory: number) {
        this.sequenceList = [];
        this.sequenceService.getSequences(idHistory).subscribe((data: any) => {
            data.forEach(element => {
                let sequenceObj: Sequence = {
                    idSequence: element.idSequence,
                    idHistory: element.idHistory,
                    idActivity: element.idActivity,
                    orderSequence: element.orderSequence,
                    Activity: element.Activity,
                    Rules: element.Rules
                };
                this.sequenceList.push(sequenceObj);
            });
        });
    }

    registerSequence(sequence: any){
        return this.sequenceService.registerSequence(sequence);
    }

    deleteSequence(idSequence:number){
        return this.sequenceService.deleteSequence(idSequence);
    }

    deleteRule(idRule: number){
        return this.sequenceService.deleteRule(idRule);
    }

    putRule(idRule:number, rule: any){
        return this.sequenceService.putRules(idRule, rule);
    }

    registerRule(rule: any){
        return this.sequenceService.registerRule(rule);
    }

   
}
