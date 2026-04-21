export interface VehicleProfile {
  id: string;
  competitionNumber: string;
  vehicleName?: string;
  make: string;
  model: string;
  year: string;
  colour: string;
  classIndex: string;
  fuelType: 'Methanol' | 'Gas' | 'Both';
  bestET?: string;
  bestSpeed?: string;
  engine: string;
  transmission: string;
  sponsors?: string;
  announcerInfo?: string;
  driverName: string;
  driverProfileId?: string;
  photoUrl?: string;
  source: string;
  sourceUrl: string;
}
