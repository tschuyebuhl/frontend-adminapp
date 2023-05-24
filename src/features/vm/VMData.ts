interface VMData {
  Name: string;
  MemoryMB: number;
  NumCpus: number;
  Project: string;
  Network: string;
  IP: string;
  Disk: string;
  installedSoftware: string[];
}

interface ChipData {
  key: number;
  label: string;
}
