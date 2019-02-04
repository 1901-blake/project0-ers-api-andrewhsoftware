import { ReimbursementStatuses } from "./reimbursementStatuses";
import { ReimbursementTypes } from "./reimbursementtypes";
export class User {
    
    reimbursementId: number;// primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: ReimbursementStatuses; // foreign key -> ReimbursementStatus, not null
    type: ReimbursementTypes; // foreign key -> ReimbursementType
  
    /* constructor(reimbursementId = 0, author = 0, amount = 0, dateSubmitted = 0, dateResolved = 0, 
        description = '', resolver = 0, status = ReimbursementStatuses, type = ReimbursementTypes) {
      this.reimbursementId = reimbursementId;
      this.author = author;
      this.amount = amount;
      this.dateSubmitted = dateSubmitted;
      this.dateResolved = dateResolved;
      this.description = description;
      this.resolver = resolver;
      this.status = new ReimbursementStatuses;
      this.type = new ReimbursementTypes;
    } */
  }