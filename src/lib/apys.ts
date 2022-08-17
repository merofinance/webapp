const apiURL = "https://mero.finance/api/apys";

export interface Apy {
  pool: string;
  apy: number;
}

export async function getApys(): Promise<Apy[]> {
  return (await fetch(apiURL)).json();
}
