type TGridStatus = "occupied" | "unoccupied";

type TGrid = {
  _id: string;
  gridId: string;
  palletId?: {
    _id: string;
    name: string;
  };
  time?: Date;
  hub: {
    _id: string | null;
    name: string;
  };
  status?: TGridStatus;
  createdBy?: string;
  updatedBy?: { _id: string; time: Date };
  destination?: string;
  active?: boolean;
  reason?: string;
};
