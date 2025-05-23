interface StopListItem {
  title: string;
  status: 'In behandeling' | 'Geannuleerd' | 'Eerst volgende' | 'Geleverd';
  stopId: string | ReactNode;
  info: StopListItemInfo;
  onPress: () => void;
}

interface StopListItemInfo {
  crates: number;
  pallets: number;
  rollerCart: number;
  hasNote: boolean;
}

interface StopListItemInfoItemProps {
  icon: ReactNode;
  name: string;
  value: string;
}

interface LoadingItem {
  stopId: string;
  customerName: string;
  address?: string;
  totalOverview?: boolean
}