export interface Service {
  id: number;
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface Banner {
  id: number;
  banner_name: string;
  banner_image: string;
  description: string;
}
