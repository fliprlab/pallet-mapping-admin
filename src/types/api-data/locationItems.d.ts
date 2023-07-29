type TLocationItems = {
  itemId: string;
  destination: string;
  _id?: ObjectId;
  pallet?: {
    _id: ObjectId;
    name: string;
  };
  status?: TShipmentStatus;
  origin?: string;
  destination: string;
  shipmentId?: ObjectId;
  zone: string;
  lpst: string;
  reason?: string;
  createdAt?: Date;
};
