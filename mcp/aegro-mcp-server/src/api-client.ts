// Aegro API Client

const BASE_URL = 'https://app.aegro.com.br/pub/v1';

export class AegroApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${BASE_URL}${path}`;

    const headers: Record<string, string> = {
      'Aegro-Public-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
      return null as T;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  // Farm (Propriedade)
  async getFarm() {
    return this.request('GET', '/farms');
  }

  // Elements (Elementos)
  async getElement(elementKey: string) {
    return this.request('GET', `/elements/${encodeURIComponent(elementKey)}`);
  }

  async filterElements(filter: unknown) {
    return this.request('POST', '/elements/filter', filter);
  }

  // Companies (Empresas)
  async getCompany(companyKey: string) {
    return this.request('GET', `/companies/${encodeURIComponent(companyKey)}`);
  }

  async filterCompanies(filter: unknown) {
    return this.request('POST', '/companies/filter', filter);
  }

  async createCompany(data: unknown) {
    return this.request('POST', '/companies', data);
  }

  // Glebes/Areas (Áreas/Talhões)
  async getGlebe(glebeKey: string) {
    return this.request('GET', `/glebes/${encodeURIComponent(glebeKey)}`);
  }

  async filterGlebes(filter: unknown) {
    return this.request('POST', '/glebes/filter', filter);
  }

  // Crops (Safras)
  async getCrop(cropKey: string) {
    return this.request('GET', `/crops/${encodeURIComponent(cropKey)}`);
  }

  async filterCrops(filter: unknown) {
    return this.request('POST', '/crops/filter', filter);
  }

  // Crop Glebes (Áreas de Safra)
  async getCropGlebe(cropGlebeKey: string) {
    return this.request('GET', `/crop-glebes/${encodeURIComponent(cropGlebeKey)}`);
  }

  async filterCropGlebes(cropKey: string, filter: unknown) {
    return this.request('POST', `/crops/${encodeURIComponent(cropKey)}/crop-glebes/filter`, filter);
  }

  // Assets (Patrimônios)
  async getAsset(assetKey: string) {
    return this.request('GET', `/assets/${encodeURIComponent(assetKey)}`);
  }

  async filterAssets(filter: unknown) {
    return this.request('POST', '/assets/filter', filter);
  }

  async createMachine(data: unknown) {
    return this.request('POST', '/assets/machines', data);
  }

  async createGarner(data: unknown) {
    return this.request('POST', '/assets/garners', data);
  }

  async createPivot(data: unknown) {
    return this.request('POST', '/assets/pivots', data);
  }

  async createImmobilized(data: unknown) {
    return this.request('POST', '/assets/immobilizeds', data);
  }

  // Asset Maintenances (Manutenções)
  async getAssetMaintenance(maintenanceKey: string) {
    return this.request('GET', `/assets/maintenances/${encodeURIComponent(maintenanceKey)}`);
  }

  async filterAssetMaintenances(filter: unknown) {
    return this.request('POST', '/assets/maintenances/filter', filter);
  }

  async createAssetMaintenance(data: unknown) {
    return this.request('POST', '/assets/maintenances', data);
  }

  // Asset Fuel Supplies (Abastecimentos)
  async getAssetFuelSupply(fuelSupplyKey: string) {
    return this.request('GET', `/assets/fuel-supplies/${encodeURIComponent(fuelSupplyKey)}`);
  }

  async filterAssetFuelSupplies(filter: unknown) {
    return this.request('POST', '/assets/fuel-supplies/filter', filter);
  }

  async createAssetFuelSupply(data: unknown) {
    return this.request('POST', '/assets/fuel-supplies', data);
  }

  // Activities (Atividades)
  async getActivity(activityKey: string) {
    return this.request('GET', `/activities/${encodeURIComponent(activityKey)}`);
  }

  async filterActivities(filter: unknown) {
    return this.request('POST', '/activities/filter', filter);
  }

  async getActivityPlan(activityKey: string) {
    return this.request('GET', `/activities/${encodeURIComponent(activityKey)}/plan`);
  }

  async getActivityPlanByKey(planKey: string) {
    return this.request('GET', `/activities/plans/${encodeURIComponent(planKey)}`);
  }

  // Activity Realizations (Realizações)
  async getActivityRealization(realizationKey: string) {
    return this.request('GET', `/activities/realizations/${encodeURIComponent(realizationKey)}`);
  }

  async filterActivityRealizations(filter: unknown) {
    return this.request('POST', '/activities/realizations/filter', filter);
  }

  // Harvest Logs (Registros de Colheita)
  async getHarvestLog(harvestLogKey: string) {
    return this.request('GET', `/harvest-logs/${encodeURIComponent(harvestLogKey)}`);
  }

  async filterHarvestLogs(cropKey: string, filter: unknown) {
    return this.request('POST', `/crops/${encodeURIComponent(cropKey)}/crop-harvest-logs/filter`, filter);
  }

  async createHarvestLog(cropKey: string, data: unknown) {
    return this.request('POST', `/crops/${encodeURIComponent(cropKey)}/crop-harvest-logs`, data);
  }

  // Harvest Discounts (Descontos)
  async getHarvestDiscounts(cropKey: string) {
    return this.request('GET', `/crops/${encodeURIComponent(cropKey)}/harvest-discounts`);
  }

  // Stock Locations (Locais de Estoque)
  async getStockLocation(locationKey: string) {
    return this.request('GET', `/stock-locations/${encodeURIComponent(locationKey)}`);
  }

  async filterStockLocations(filter: unknown) {
    return this.request('POST', '/stock-locations/filter', filter);
  }

  // Stock Items (Itens de Estoque)
  async getStockItem(itemKey: string) {
    return this.request('GET', `/stock-items/${encodeURIComponent(itemKey)}`);
  }

  async filterStockItems(filter: unknown) {
    return this.request('POST', '/stock-items/filter', filter);
  }

  // Stock Logs (Movimentações de Estoque)
  async getStockLog(logKey: string) {
    return this.request('GET', `/stock-logs/${encodeURIComponent(logKey)}`);
  }

  async filterStockLogs(filter: unknown) {
    return this.request('POST', '/stock-logs/filter', filter);
  }

  // Bank Accounts (Contas Bancárias)
  async getBankAccount(accountKey: string) {
    return this.request('GET', `/bank-accounts/${encodeURIComponent(accountKey)}`);
  }

  async filterBankAccounts(filter: unknown) {
    return this.request('POST', '/bank-accounts/filter', filter);
  }

  // Bills (Contas a Pagar/Receber)
  async getBill(billKey: string) {
    return this.request('GET', `/bills/${encodeURIComponent(billKey)}`);
  }

  async filterBills(filter: unknown) {
    return this.request('POST', '/bills/filter', filter);
  }

  // Installments (Parcelas)
  async getInstallment(installmentKey: string) {
    return this.request('GET', `/installments/${encodeURIComponent(installmentKey)}`);
  }

  async filterInstallments(filter: unknown) {
    return this.request('POST', '/installments/filter', filter);
  }

  async saveInstallment(data: unknown) {
    return this.request('POST', '/installments', data);
  }

  async deleteInstallments(keys: string[]) {
    return this.request('POST', '/installments/delete', { keys });
  }

  // Financial Categories (Categorias Financeiras)
  async getFinancialCategory(categoryKey: string) {
    return this.request('GET', `/financial-categories/${encodeURIComponent(categoryKey)}`);
  }

  async filterFinancialCategories(filter: unknown) {
    return this.request('POST', '/financial-categories/filter', filter);
  }

  async createFinancialCategory(data: unknown) {
    return this.request('POST', '/financial-categories', data);
  }

  async getElementFinancialCategories(elementKey: string, filter: unknown) {
    return this.request('POST', `/financial-categories/element/${encodeURIComponent(elementKey)}/filter`, filter);
  }

  // Purchase Orders (Ordens de Compra)
  async getPurchaseOrder(orderKey: string) {
    return this.request('GET', `/purchase-orders/${encodeURIComponent(orderKey)}`);
  }

  async filterPurchaseOrders(filter: unknown) {
    return this.request('POST', '/purchase-orders/filter', filter);
  }

  // Apportionments (Rateios)
  async getApportionment(apportionmentKey: string) {
    return this.request('GET', `/apportionments/${encodeURIComponent(apportionmentKey)}`);
  }

  async filterApportionments(filter: unknown) {
    return this.request('POST', '/apportionments/filter', filter);
  }

  // Weather Logs (Registros Climáticos)
  async getWeatherLog(logKey: string) {
    return this.request('GET', `/weather-logs/${encodeURIComponent(logKey)}`);
  }

  async filterWeatherLogs(filter: unknown) {
    return this.request('POST', '/weather-logs/filter', filter);
  }

  async createWeatherLog(data: unknown) {
    return this.request('POST', '/weather-logs', data);
  }

  // Tags
  async getTag(tagKey: string) {
    return this.request('GET', `/tags/${encodeURIComponent(tagKey)}`);
  }

  async filterTags(filter: unknown) {
    return this.request('POST', '/tags/filter', filter);
  }

  async createTag(data: unknown) {
    return this.request('POST', '/tags', data);
  }

  // Climate Records (Registros Climáticos Legacy)
  async getClimateRecord(recordKey: string) {
    return this.request('GET', `/climate-records/${encodeURIComponent(recordKey)}`);
  }

  async filterClimateRecords(filter: unknown) {
    return this.request('POST', '/climate-records/filter', filter);
  }

  // Catalogs (Catálogos)
  async filterCatalogElements(filter: unknown) {
    return this.request('POST', '/catalogs/elements/filter', filter);
  }

  async filterCatalogPests(filter: unknown) {
    return this.request('POST', '/catalogs/pests/filter', filter);
  }
}
