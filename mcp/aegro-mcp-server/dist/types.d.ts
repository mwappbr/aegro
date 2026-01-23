export interface Quantity {
    unit: string;
    magnitude: number;
}
export interface Money {
    amount: number;
    currency: string;
}
export interface CurrencyConversion {
    originalCurrency: string;
    conversionRate: number;
    convertedAmount: Money;
}
export interface Farm {
    key: string;
    name: string;
    totalArea?: Quantity;
}
export interface Element {
    key: string;
    name: string;
    category: ElementCategory;
    type?: string;
    measuringUnit?: string;
}
export type ElementCategory = 'DEFENSIVE' | 'FERTILIZER' | 'ITEM' | 'SEED' | 'SERVICE' | 'PEST';
export interface Company {
    key: string;
    legalName: string;
    tradeName?: string;
    farmKey: string;
    types: CompanyType[];
    address?: Address;
    fiscalNumber?: FiscalNumber;
    contact?: Contact;
    observations?: string;
}
export type CompanyType = 'PROVIDER' | 'CUSTOMER' | 'BOTH';
export interface Address {
    country?: string;
    isoCode?: string;
    countryDivision?: string;
    postalCode?: string;
    city?: string;
    neighborhoodName?: string;
    locationName?: string;
    locationNumber?: string;
    complement?: string;
    additionalAddress?: string;
}
export interface FiscalNumber {
    code: string;
    countryCode?: string;
    fiscalNumberType?: string;
    pisCofinsTaxRegimeType?: string;
}
export interface Contact {
    phone?: string;
    cellPhone?: string;
    email?: string;
}
export interface Glebe {
    key: string;
    farmKey: string;
    name: string;
    totalArea?: Quantity;
    coordinates?: Coordinate[];
}
export interface Coordinate {
    latitude: number;
    longitude: number;
}
export interface Crop {
    key: string;
    farmKey: string;
    name: string;
    startDate?: string;
    endDate?: string;
    status?: CropStatus;
    totalArea?: Quantity;
}
export type CropStatus = 'ACTIVE' | 'FINISHED' | 'CANCELLED';
export interface CropGlebe {
    key: string;
    cropKey: string;
    glebeKey: string;
    glebeName?: string;
    plantedArea?: Quantity;
    productivityGoal?: Quantity;
    elementKey?: string;
}
export interface Asset {
    key: string;
    farmKey: string;
    name: string;
    type: AssetType;
    brand?: string;
    model?: string;
    year?: number;
    serialNumber?: string;
    purchaseDate?: string;
    purchaseValue?: Money;
    status?: AssetStatus;
    observations?: string;
    currentHourmeter?: number;
    tagOrModel?: string;
}
export type AssetType = 'MACHINE' | 'IMPLEMENT' | 'VEHICLE' | 'EQUIPMENT' | 'PIVOT' | 'GARNER' | 'IMMOBILIZED';
export type AssetStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'SOLD' | 'DISPOSED';
export interface AssetMaintenance {
    key: string;
    assetKey: string;
    farmKey: string;
    maintenanceType: MaintenanceType;
    description?: string;
    occurrenceDate: string;
    hourmeterAtOccurrence?: number;
    cost?: Money;
    observations?: string;
}
export type MaintenanceType = 'PREVENTIVE' | 'CORRECTIVE' | 'PREDICTIVE';
export interface AssetFuelSupply {
    key: string;
    assetKey: string;
    farmKey: string;
    stockLocationKey?: string;
    farmUserKeys?: string[];
    occurrenceDate: string;
    hourmeterAtOccurrence?: number;
    observations?: string;
    inputs?: AssetEventInput[];
}
export interface AssetEventInput {
    elementKey: string;
    quantity: Quantity;
}
export interface Activity {
    key: string;
    farmKey: string;
    cropGlebeKeys?: string[];
    activityType: string;
    status: ActivityStatus;
    plannedStartDate?: string;
    plannedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    observations?: string;
}
export type ActivityStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export interface ActivityPlan {
    key: string;
    activityKey: string;
    plannedDate?: string;
    plannedArea?: Quantity;
    inputs?: ActivityInput[];
}
export interface ActivityRealization {
    key: string;
    activityKey: string;
    realizationDate: string;
    realizedArea?: Quantity;
    inputs?: ActivityInput[];
    machines?: ActivityMachine[];
    workers?: ActivityWorker[];
}
export interface ActivityInput {
    elementKey: string;
    quantity: Quantity;
    unitCost?: Money;
}
export interface ActivityMachine {
    assetKey: string;
    hourmeterStart?: number;
    hourmeterEnd?: number;
}
export interface ActivityWorker {
    userKey: string;
    workedHours?: number;
}
export interface HarvestLog {
    key: string;
    farmKey: string;
    cropGlebeKey: string;
    harvestDate: string;
    grossWeight?: Quantity;
    netWeight?: Quantity;
    humidity?: number;
    impurity?: number;
    discounts?: HarvestDiscount[];
    observations?: string;
}
export interface HarvestDiscount {
    type: string;
    percentage?: number;
    quantity?: Quantity;
}
export interface StockLocation {
    key: string;
    farmKey: string;
    name: string;
    type?: StockLocationType;
}
export type StockLocationType = 'WAREHOUSE' | 'SILO' | 'TANK' | 'OTHER';
export interface StockItem {
    key: string;
    stockLocationKey: string;
    elementKey: string;
    currentQuantity: Quantity;
    averageCost?: Money;
}
export interface StockLog {
    key: string;
    stockLocationKey: string;
    elementKey: string;
    logType: StockLogType;
    quantity: Quantity;
    logDate: string;
    unitCost?: Money;
    observations?: string;
}
export type StockLogType = 'ENTRY' | 'EXIT' | 'TRANSFER' | 'ADJUSTMENT';
export interface BankAccount {
    key: string;
    farmKey: string;
    name: string;
    bankCode?: string;
    bankName?: string;
    agencyNumber?: string;
    accountNumber?: string;
    accountType?: BankAccountType;
    currentBalance?: Money;
}
export type BankAccountType = 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
export interface Bill {
    key: string;
    farmKey: string;
    billType: BillType;
    companyKey?: string;
    description: string;
    totalAmount: Money;
    dueDate?: string;
    status?: BillStatus;
    financialCategoryKey?: string;
}
export type BillType = 'PAYABLE' | 'RECEIVABLE';
export type BillStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export interface Installment {
    key: string;
    billKey: string;
    bankAccountKey?: string;
    number?: number;
    dueDate: string;
    realizedDate?: string;
    effectiveDate?: string;
    financialFlowType: FinancialFlowType;
    status: InstallmentStatus;
    amount: Money;
    paidAmount?: Money;
    currencyConversion?: CurrencyConversion;
}
export type FinancialFlowType = 'INFLOW' | 'OUTFLOW';
export type InstallmentStatus = 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';
export interface FinancialCategory {
    key: string;
    farmKey: string;
    code: string;
    description: string;
    billType: BillType;
    operationType: OperationType;
    type: FinancialCategoryType;
    status: FinancialCategoryStatus;
    parentKey?: string;
    observations?: string;
}
export type OperationType = 'REVENUE' | 'EXPENSE' | 'TRANSFER';
export type FinancialCategoryType = 'STANDARD' | 'SYSTEM';
export type FinancialCategoryStatus = 'ACTIVE' | 'INACTIVE';
export interface PurchaseOrder {
    key: string;
    farmKey: string;
    companyKey?: string;
    orderNumber?: string;
    orderDate: string;
    deliveryDate?: string;
    status?: PurchaseOrderStatus;
    items?: PurchaseOrderItem[];
    totalAmount?: Money;
    observations?: string;
}
export type PurchaseOrderStatus = 'DRAFT' | 'SENT' | 'CONFIRMED' | 'PARTIAL' | 'RECEIVED' | 'CANCELLED';
export interface PurchaseOrderItem {
    elementKey: string;
    quantity: Quantity;
    unitPrice: Money;
    totalPrice?: Money;
}
export interface Apportionment {
    key: string;
    farmKey: string;
    name: string;
    percentage: number;
    cropGlebeKeys?: string[];
}
export interface WeatherLog {
    key: string;
    farmKey: string;
    glebeKey?: string;
    logDate: string;
    temperature?: number;
    humidity?: number;
    precipitation?: number;
    windSpeed?: number;
    observations?: string;
}
export interface Tag {
    key: string;
    farmKey: string;
    name: string;
    color?: string;
}
export interface ClimateRecord {
    key: string;
    farmKey: string;
    glebeKey?: string;
    recordDate: string;
    minTemperature?: number;
    maxTemperature?: number;
    precipitation?: number;
    observations?: string;
}
export interface PageFilter {
    requiredPageNumber?: number;
    maximumItemsPerPageCount?: number;
    sortDescending?: boolean;
}
export interface ElementFilter extends PageFilter {
    elementKeys?: string[];
    categories?: ElementCategory[];
    types?: string[];
    searchText?: string;
}
export interface CompanyFilter extends PageFilter {
    searchText?: string;
    fiscalNumberCodes?: string[];
    types?: CompanyType[];
    countryDivision?: string;
    isoCode?: string;
}
export interface GlebeFilter extends PageFilter {
    glebeKeys?: string[];
    searchText?: string;
}
export interface CropFilter extends PageFilter {
    cropKeys?: string[];
    statuses?: CropStatus[];
}
export interface CropGlebeFilter extends PageFilter {
    cropGlebeKeys?: string[];
    glebeKeys?: string[];
}
export interface AssetFilter extends PageFilter {
    assetKeys?: string[];
    types?: AssetType[];
    statuses?: AssetStatus[];
    searchText?: string;
}
export interface AssetMaintenanceFilter extends PageFilter {
    assetKeys?: string[];
    maintenanceTypes?: MaintenanceType[];
    startDate?: string;
    endDate?: string;
}
export interface AssetFuelSupplyFilter extends PageFilter {
    assetKeys?: string[];
    startDate?: string;
    endDate?: string;
}
export interface ActivityFilter extends PageFilter {
    activityKeys?: string[];
    cropGlebeKeys?: string[];
    statuses?: ActivityStatus[];
    startDate?: string;
    endDate?: string;
}
export interface ActivityRealizationFilter extends PageFilter {
    activityKeys?: string[];
    cropGlebeKeys?: string[];
    startDate?: string;
    endDate?: string;
}
export interface HarvestLogFilter extends PageFilter {
    cropGlebeKeys?: string[];
    startDate?: string;
    endDate?: string;
}
export interface StockLocationFilter extends PageFilter {
    types?: StockLocationType[];
    searchText?: string;
}
export interface StockItemFilter extends PageFilter {
    stockLocationKeys?: string[];
    elementKeys?: string[];
}
export interface StockLogFilter extends PageFilter {
    stockLocationKeys?: string[];
    elementKeys?: string[];
    logTypes?: StockLogType[];
    startDate?: string;
    endDate?: string;
}
export interface BankAccountFilter extends PageFilter {
    searchText?: string;
}
export interface BillFilter extends PageFilter {
    billTypes?: BillType[];
    statuses?: BillStatus[];
    companyKeys?: string[];
    financialCategoryKeys?: string[];
    startDueDate?: string;
    endDueDate?: string;
}
export interface InstallmentFilter extends PageFilter {
    billKeys?: string[];
    bankAccountKeys?: string[];
    statuses?: InstallmentStatus[];
    financialFlowTypes?: FinancialFlowType[];
    startDueDate?: string;
    endDueDate?: string;
    startRealizedDate?: string;
    endRealizedDate?: string;
}
export interface FinancialCategoryFilter extends PageFilter {
    billTypes?: BillType[];
    operationTypes?: OperationType[];
    types?: FinancialCategoryType[];
    statuses?: FinancialCategoryStatus[];
    searchText?: string;
}
export interface PurchaseOrderFilter extends PageFilter {
    companyKeys?: string[];
    statuses?: PurchaseOrderStatus[];
    startDate?: string;
    endDate?: string;
}
export interface ApportionmentFilter extends PageFilter {
    cropGlebeKeys?: string[];
}
export interface WeatherLogFilter extends PageFilter {
    glebeKeys?: string[];
    startDate?: string;
    endDate?: string;
}
export interface TagFilter extends PageFilter {
    searchText?: string;
}
export interface ClimateRecordFilter extends PageFilter {
    glebeKeys?: string[];
    startDate?: string;
    endDate?: string;
}
export interface PageResponse<T> {
    items: T[];
    currentPageNumber: number;
    totalPagesCount: number;
    totalItemsCount: number;
    maximumItemsPerPageCount: number;
    sortedBy?: string;
    sortDescending?: boolean;
    existAnyItem?: boolean;
}
export interface CompanyCreateRequest {
    legalName: string;
    tradeName?: string;
    types: CompanyType[];
    address?: Address;
    fiscalNumber?: FiscalNumber;
    contact?: Contact;
    observations?: string;
}
export interface AssetMaintenanceCreateRequest {
    assetKey: string;
    maintenanceType: MaintenanceType;
    description?: string;
    occurrenceDate: string;
    hourmeterAtOccurrence?: number;
    cost?: Money;
    observations?: string;
}
export interface AssetFuelSupplyCreateRequest {
    assetKey: string;
    stockLocationKey?: string;
    farmUserKeys?: string[];
    occurrenceDate: string;
    hourmeterAtOccurrence?: number;
    observations?: string;
    inputs?: AssetEventInput[];
}
export interface HarvestLogCreateRequest {
    cropGlebeKey: string;
    harvestDate: string;
    grossWeight?: Quantity;
    netWeight?: Quantity;
    humidity?: number;
    impurity?: number;
    discounts?: HarvestDiscount[];
    observations?: string;
}
export interface WeatherLogCreateRequest {
    glebeKey?: string;
    logDate: string;
    temperature?: number;
    humidity?: number;
    precipitation?: number;
    windSpeed?: number;
    observations?: string;
}
export interface TagCreateRequest {
    name: string;
    color?: string;
}
export interface FinancialCategoryCreateRequest {
    code: string;
    description: string;
    billType: BillType;
    operationType: OperationType;
    type?: FinancialCategoryType;
    status?: FinancialCategoryStatus;
    parentKey?: string;
    observations?: string;
}
export interface InstallmentSaveRequest {
    key?: string;
    billKey: string;
    bankAccountKey?: string;
    number?: number;
    dueDate: string;
    realizedDate?: string;
    amount: Money;
}
export interface AssetCreateRequest {
    name: string;
    type: AssetType;
    brand?: string;
    model?: string;
    year?: number;
    serialNumber?: string;
    purchaseDate?: string;
    purchaseValue?: Money;
    status?: AssetStatus;
    observations?: string;
    currentHourmeter?: number;
    tagOrModel?: string;
}
