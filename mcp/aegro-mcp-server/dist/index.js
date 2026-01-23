#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { AegroApiClient } from './api-client.js';
// Get API key from environment
const API_KEY = process.env.AEGRO_API_KEY;
if (!API_KEY) {
    console.error('Error: AEGRO_API_KEY environment variable is required');
    process.exit(1);
}
const client = new AegroApiClient(API_KEY);
// Create MCP server
const server = new McpServer({
    name: 'aegro-mcp-server',
    version: '1.0.0',
});
// ============================================================
// FARM (PROPRIEDADE)
// ============================================================
server.tool('aegro_get_farm', 'Get farm/property information associated with the API key. Returns farm name, total area, and key.', {}, async () => {
    try {
        const result = await client.getFarm();
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ELEMENTS (ELEMENTOS)
// ============================================================
server.tool('aegro_get_element', 'Get a specific element (seed, fertilizer, defensive, service, etc.) by its key.', {
    elementKey: z.string().describe('The unique key of the element (e.g., "element::60f8a7b3e4b0a3e4a3a3a3a3")'),
}, async ({ elementKey }) => {
    try {
        const result = await client.getElement(elementKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_elements', 'Filter and list elements (seeds, fertilizers, defensives, services, items, pests) with pagination.', {
    elementKeys: z.array(z.string()).optional().describe('Filter by specific element keys'),
    categories: z.array(z.enum(['DEFENSIVE', 'FERTILIZER', 'ITEM', 'SEED', 'SERVICE', 'PEST'])).optional().describe('Filter by categories'),
    types: z.array(z.string()).optional().describe('Filter by types (e.g., CORN, SOYBEAN)'),
    searchText: z.string().optional().describe('Search text to filter elements'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number (starts at 1)'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page (max 100)'),
}, async (params) => {
    try {
        const result = await client.filterElements(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// COMPANIES (EMPRESAS/FORNECEDORES)
// ============================================================
server.tool('aegro_get_company', 'Get a specific company/supplier by its key.', {
    companyKey: z.string().describe('The unique key of the company'),
}, async ({ companyKey }) => {
    try {
        const result = await client.getCompany(companyKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_companies', 'Filter and list companies/suppliers with pagination.', {
    searchText: z.string().optional().describe('Search text for company name'),
    fiscalNumberCodes: z.array(z.string()).optional().describe('Filter by fiscal numbers (CNPJ/CPF)'),
    types: z.array(z.enum(['PROVIDER', 'CUSTOMER', 'BOTH'])).optional().describe('Filter by company types'),
    countryDivision: z.string().optional().describe('Filter by state/region'),
    isoCode: z.string().optional().describe('Filter by country ISO code'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterCompanies(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_company', 'Create a new company/supplier.', {
    legalName: z.string().describe('Legal name of the company'),
    tradeName: z.string().optional().describe('Trade name'),
    types: z.array(z.enum(['PROVIDER', 'CUSTOMER', 'BOTH'])).describe('Company types'),
    observations: z.string().optional().describe('Observations'),
    address: z.object({
        country: z.string().optional(),
        isoCode: z.string().optional(),
        countryDivision: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        neighborhoodName: z.string().optional(),
        locationName: z.string().optional(),
        locationNumber: z.string().optional(),
        complement: z.string().optional(),
    }).optional().describe('Address information'),
    fiscalNumber: z.object({
        code: z.string(),
        countryCode: z.string().optional(),
        fiscalNumberType: z.string().optional(),
    }).optional().describe('Fiscal number (CNPJ/CPF)'),
    contact: z.object({
        phone: z.string().optional(),
        cellPhone: z.string().optional(),
        email: z.string().optional(),
    }).optional().describe('Contact information'),
}, async (params) => {
    try {
        const result = await client.createCompany(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// GLEBES/AREAS (TALHÕES)
// ============================================================
server.tool('aegro_get_glebe', 'Get a specific field/area (talhão) by its key.', {
    glebeKey: z.string().describe('The unique key of the glebe/area'),
}, async ({ glebeKey }) => {
    try {
        const result = await client.getGlebe(glebeKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_glebes', 'Filter and list fields/areas (talhões) with pagination.', {
    glebeKeys: z.array(z.string()).optional().describe('Filter by specific glebe keys'),
    searchText: z.string().optional().describe('Search text for glebe name'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
    sortDescending: z.boolean().optional().describe('Sort in descending order'),
}, async (params) => {
    try {
        const result = await client.filterGlebes(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// CROPS (SAFRAS)
// ============================================================
server.tool('aegro_get_crop', 'Get a specific crop/season (safra) by its key.', {
    cropKey: z.string().describe('The unique key of the crop'),
}, async ({ cropKey }) => {
    try {
        const result = await client.getCrop(cropKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_crops', 'Filter and list crops/seasons (safras) with pagination.', {
    cropKeys: z.array(z.string()).optional().describe('Filter by specific crop keys'),
    statuses: z.array(z.enum(['ACTIVE', 'FINISHED', 'CANCELLED'])).optional().describe('Filter by status'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterCrops(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// CROP GLEBES (ÁREAS DE SAFRA)
// ============================================================
server.tool('aegro_get_crop_glebe', 'Get a specific crop-glebe (área de safra) by its key.', {
    cropGlebeKey: z.string().describe('The unique key of the crop-glebe'),
}, async ({ cropGlebeKey }) => {
    try {
        const result = await client.getCropGlebe(cropGlebeKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_crop_glebes', 'Filter and list crop-glebes (áreas de safra) for a specific crop.', {
    cropKey: z.string().describe('The crop key to filter crop-glebes for'),
    cropGlebeKeys: z.array(z.string()).optional().describe('Filter by specific crop-glebe keys'),
    glebeKeys: z.array(z.string()).optional().describe('Filter by glebe keys'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async ({ cropKey, ...filter }) => {
    try {
        const result = await client.filterCropGlebes(cropKey, filter);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ASSETS (PATRIMÔNIOS)
// ============================================================
server.tool('aegro_get_asset', 'Get a specific asset (machine, implement, vehicle, pivot, etc.) by its key.', {
    assetKey: z.string().describe('The unique key of the asset'),
}, async ({ assetKey }) => {
    try {
        const result = await client.getAsset(assetKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_assets', 'Filter and list assets (machines, implements, vehicles, pivots, etc.) with pagination.', {
    assetKeys: z.array(z.string()).optional().describe('Filter by specific asset keys'),
    types: z.array(z.enum(['MACHINE', 'IMPLEMENT', 'VEHICLE', 'EQUIPMENT', 'PIVOT', 'GARNER', 'IMMOBILIZED'])).optional().describe('Filter by asset types'),
    statuses: z.array(z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'SOLD', 'DISPOSED'])).optional().describe('Filter by status'),
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterAssets(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_machine', 'Create a new machine asset.', {
    name: z.string().describe('Machine name'),
    brand: z.string().optional().describe('Brand'),
    model: z.string().optional().describe('Model'),
    year: z.number().optional().describe('Year'),
    serialNumber: z.string().optional().describe('Serial number'),
    purchaseDate: z.string().optional().describe('Purchase date (YYYY-MM-DD)'),
    currentHourmeter: z.number().optional().describe('Current hourmeter'),
    tagOrModel: z.string().optional().describe('Tag or model identifier'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createMachine(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_garner', 'Create a new garner/silo asset.', {
    name: z.string().describe('Garner name'),
    brand: z.string().optional().describe('Brand'),
    model: z.string().optional().describe('Model'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createGarner(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_pivot', 'Create a new pivot/irrigation asset.', {
    name: z.string().describe('Pivot name'),
    brand: z.string().optional().describe('Brand'),
    model: z.string().optional().describe('Model'),
    currentHourmeter: z.number().optional().describe('Current hourmeter'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createPivot(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_immobilized', 'Create a new immobilized/fixed asset.', {
    name: z.string().describe('Asset name'),
    brand: z.string().optional().describe('Brand'),
    model: z.string().optional().describe('Model'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createImmobilized(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ASSET MAINTENANCES (MANUTENÇÕES)
// ============================================================
server.tool('aegro_get_asset_maintenance', 'Get a specific asset maintenance record by its key.', {
    maintenanceKey: z.string().describe('The unique key of the maintenance'),
}, async ({ maintenanceKey }) => {
    try {
        const result = await client.getAssetMaintenance(maintenanceKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_asset_maintenances', 'Filter and list asset maintenance records with pagination.', {
    assetKeys: z.array(z.string()).optional().describe('Filter by asset keys'),
    maintenanceTypes: z.array(z.enum(['PREVENTIVE', 'CORRECTIVE', 'PREDICTIVE'])).optional().describe('Filter by maintenance types'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterAssetMaintenances(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_asset_maintenance', 'Create a new asset maintenance record.', {
    assetKey: z.string().describe('The asset key'),
    maintenanceType: z.enum(['PREVENTIVE', 'CORRECTIVE', 'PREDICTIVE']).describe('Type of maintenance'),
    description: z.string().optional().describe('Description'),
    occurrenceDate: z.string().describe('Occurrence date (YYYY-MM-DD)'),
    hourmeterAtOccurrence: z.number().optional().describe('Hourmeter at occurrence'),
    cost: z.object({
        amount: z.number(),
        currency: z.string().default('BRL'),
    }).optional().describe('Maintenance cost'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createAssetMaintenance(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ASSET FUEL SUPPLIES (ABASTECIMENTOS)
// ============================================================
server.tool('aegro_get_asset_fuel_supply', 'Get a specific fuel supply record by its key.', {
    fuelSupplyKey: z.string().describe('The unique key of the fuel supply'),
}, async ({ fuelSupplyKey }) => {
    try {
        const result = await client.getAssetFuelSupply(fuelSupplyKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_asset_fuel_supplies', 'Filter and list fuel supply records with pagination.', {
    assetKeys: z.array(z.string()).optional().describe('Filter by asset keys'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterAssetFuelSupplies(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_asset_fuel_supply', 'Create a new fuel supply record.', {
    assetKey: z.string().describe('The asset key'),
    stockLocationKey: z.string().optional().describe('Stock location key'),
    farmUserKeys: z.array(z.string()).optional().describe('Farm user keys'),
    occurrenceDate: z.string().describe('Occurrence date (YYYY-MM-DD)'),
    hourmeterAtOccurrence: z.number().optional().describe('Hourmeter at occurrence'),
    observations: z.string().optional().describe('Observations'),
    inputs: z.array(z.object({
        elementKey: z.string(),
        quantity: z.object({
            unit: z.string(),
            magnitude: z.number(),
        }),
    })).optional().describe('Fuel inputs'),
}, async (params) => {
    try {
        const result = await client.createAssetFuelSupply(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ACTIVITIES (ATIVIDADES)
// ============================================================
server.tool('aegro_get_activity', 'Get a specific activity by its key.', {
    activityKey: z.string().describe('The unique key of the activity'),
}, async ({ activityKey }) => {
    try {
        const result = await client.getActivity(activityKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_activities', 'Filter and list activities with pagination.', {
    activityKeys: z.array(z.string()).optional().describe('Filter by activity keys'),
    cropGlebeKeys: z.array(z.string()).optional().describe('Filter by crop-glebe keys'),
    statuses: z.array(z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])).optional().describe('Filter by status'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterActivities(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_get_activity_plan', 'Get the plan for a specific activity.', {
    activityKey: z.string().describe('The activity key'),
}, async ({ activityKey }) => {
    try {
        const result = await client.getActivityPlan(activityKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_get_activity_plan_by_key', 'Get a specific activity plan by its key.', {
    planKey: z.string().describe('The plan key'),
}, async ({ planKey }) => {
    try {
        const result = await client.getActivityPlanByKey(planKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// ACTIVITY REALIZATIONS (REALIZAÇÕES)
// ============================================================
server.tool('aegro_get_activity_realization', 'Get a specific activity realization by its key.', {
    realizationKey: z.string().describe('The realization key'),
}, async ({ realizationKey }) => {
    try {
        const result = await client.getActivityRealization(realizationKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_activity_realizations', 'Filter and list activity realizations with pagination.', {
    activityKeys: z.array(z.string()).optional().describe('Filter by activity keys'),
    cropGlebeKeys: z.array(z.string()).optional().describe('Filter by crop-glebe keys'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterActivityRealizations(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// HARVEST LOGS (REGISTROS DE COLHEITA)
// ============================================================
server.tool('aegro_get_harvest_log', 'Get a specific harvest log by its key.', {
    harvestLogKey: z.string().describe('The harvest log key'),
}, async ({ harvestLogKey }) => {
    try {
        const result = await client.getHarvestLog(harvestLogKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_harvest_logs', 'Filter and list harvest logs for a crop with pagination.', {
    cropKey: z.string().describe('The crop key'),
    cropGlebeKeys: z.array(z.string()).optional().describe('Filter by crop-glebe keys'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async ({ cropKey, ...filter }) => {
    try {
        const result = await client.filterHarvestLogs(cropKey, filter);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_harvest_log', 'Create a new harvest log for a crop.', {
    cropKey: z.string().describe('The crop key'),
    cropGlebeKey: z.string().describe('The crop-glebe key'),
    harvestDate: z.string().describe('Harvest date (YYYY-MM-DD)'),
    grossWeight: z.object({
        unit: z.string(),
        magnitude: z.number(),
    }).optional().describe('Gross weight'),
    netWeight: z.object({
        unit: z.string(),
        magnitude: z.number(),
    }).optional().describe('Net weight'),
    humidity: z.number().optional().describe('Humidity percentage'),
    impurity: z.number().optional().describe('Impurity percentage'),
    observations: z.string().optional().describe('Observations'),
}, async ({ cropKey, ...data }) => {
    try {
        const result = await client.createHarvestLog(cropKey, data);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_get_harvest_discounts', 'Get harvest discount configurations for a crop.', {
    cropKey: z.string().describe('The crop key'),
}, async ({ cropKey }) => {
    try {
        const result = await client.getHarvestDiscounts(cropKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// STOCK LOCATIONS (LOCAIS DE ESTOQUE)
// ============================================================
server.tool('aegro_get_stock_location', 'Get a specific stock location by its key.', {
    locationKey: z.string().describe('The stock location key'),
}, async ({ locationKey }) => {
    try {
        const result = await client.getStockLocation(locationKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_stock_locations', 'Filter and list stock locations with pagination.', {
    types: z.array(z.enum(['WAREHOUSE', 'SILO', 'TANK', 'OTHER'])).optional().describe('Filter by location types'),
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterStockLocations(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// STOCK ITEMS (ITENS DE ESTOQUE)
// ============================================================
server.tool('aegro_get_stock_item', 'Get a specific stock item by its key.', {
    itemKey: z.string().describe('The stock item key'),
}, async ({ itemKey }) => {
    try {
        const result = await client.getStockItem(itemKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_stock_items', 'Filter and list stock items with pagination.', {
    stockLocationKeys: z.array(z.string()).optional().describe('Filter by stock location keys'),
    elementKeys: z.array(z.string()).optional().describe('Filter by element keys'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterStockItems(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// STOCK LOGS (MOVIMENTAÇÕES DE ESTOQUE)
// ============================================================
server.tool('aegro_get_stock_log', 'Get a specific stock movement log by its key.', {
    logKey: z.string().describe('The stock log key'),
}, async ({ logKey }) => {
    try {
        const result = await client.getStockLog(logKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_stock_logs', 'Filter and list stock movement logs with pagination.', {
    stockLocationKeys: z.array(z.string()).optional().describe('Filter by stock location keys'),
    elementKeys: z.array(z.string()).optional().describe('Filter by element keys'),
    logTypes: z.array(z.enum(['ENTRY', 'EXIT', 'TRANSFER', 'ADJUSTMENT'])).optional().describe('Filter by log types'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterStockLogs(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// BANK ACCOUNTS (CONTAS BANCÁRIAS)
// ============================================================
server.tool('aegro_get_bank_account', 'Get a specific bank account by its key.', {
    accountKey: z.string().describe('The bank account key'),
}, async ({ accountKey }) => {
    try {
        const result = await client.getBankAccount(accountKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_bank_accounts', 'Filter and list bank accounts with pagination.', {
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterBankAccounts(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// BILLS (CONTAS A PAGAR/RECEBER)
// ============================================================
server.tool('aegro_get_bill', 'Get a specific bill (payable/receivable) by its key.', {
    billKey: z.string().describe('The bill key'),
}, async ({ billKey }) => {
    try {
        const result = await client.getBill(billKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_bills', 'Filter and list bills (payables/receivables) with pagination.', {
    billTypes: z.array(z.enum(['PAYABLE', 'RECEIVABLE'])).optional().describe('Filter by bill types'),
    statuses: z.array(z.enum(['PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'CANCELLED'])).optional().describe('Filter by status'),
    companyKeys: z.array(z.string()).optional().describe('Filter by company keys'),
    financialCategoryKeys: z.array(z.string()).optional().describe('Filter by financial category keys'),
    startDueDate: z.string().optional().describe('Start due date (YYYY-MM-DD)'),
    endDueDate: z.string().optional().describe('End due date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterBills(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// INSTALLMENTS (PARCELAS)
// ============================================================
server.tool('aegro_get_installment', 'Get a specific installment by its key.', {
    installmentKey: z.string().describe('The installment key'),
}, async ({ installmentKey }) => {
    try {
        const result = await client.getInstallment(installmentKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_installments', 'Filter and list installments with pagination.', {
    billKeys: z.array(z.string()).optional().describe('Filter by bill keys'),
    bankAccountKeys: z.array(z.string()).optional().describe('Filter by bank account keys'),
    statuses: z.array(z.enum(['PENDING', 'PAID', 'PARTIAL', 'OVERDUE', 'CANCELLED'])).optional().describe('Filter by status'),
    financialFlowTypes: z.array(z.enum(['INFLOW', 'OUTFLOW'])).optional().describe('Filter by flow types'),
    startDueDate: z.string().optional().describe('Start due date (YYYY-MM-DD)'),
    endDueDate: z.string().optional().describe('End due date (YYYY-MM-DD)'),
    startRealizedDate: z.string().optional().describe('Start realized date (YYYY-MM-DD)'),
    endRealizedDate: z.string().optional().describe('End realized date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterInstallments(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_save_installment', 'Create or update an installment.', {
    key: z.string().optional().describe('Installment key (omit to create new)'),
    billKey: z.string().describe('The bill key'),
    bankAccountKey: z.string().optional().describe('Bank account key'),
    number: z.number().optional().describe('Installment number'),
    dueDate: z.string().describe('Due date (YYYY-MM-DD)'),
    realizedDate: z.string().optional().describe('Realized date (YYYY-MM-DD)'),
    amount: z.object({
        amount: z.number(),
        currency: z.string().default('BRL'),
    }).describe('Installment amount'),
}, async (params) => {
    try {
        const result = await client.saveInstallment(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_delete_installments', 'Delete one or more installments.', {
    keys: z.array(z.string()).describe('Installment keys to delete'),
}, async ({ keys }) => {
    try {
        const result = await client.deleteInstallments(keys);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// FINANCIAL CATEGORIES (CATEGORIAS FINANCEIRAS)
// ============================================================
server.tool('aegro_get_financial_category', 'Get a specific financial category by its key.', {
    categoryKey: z.string().describe('The financial category key'),
}, async ({ categoryKey }) => {
    try {
        const result = await client.getFinancialCategory(categoryKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_financial_categories', 'Filter and list financial categories with pagination.', {
    billTypes: z.array(z.enum(['PAYABLE', 'RECEIVABLE'])).optional().describe('Filter by bill types'),
    operationTypes: z.array(z.enum(['REVENUE', 'EXPENSE', 'TRANSFER'])).optional().describe('Filter by operation types'),
    types: z.array(z.enum(['STANDARD', 'SYSTEM'])).optional().describe('Filter by category types'),
    statuses: z.array(z.enum(['ACTIVE', 'INACTIVE'])).optional().describe('Filter by status'),
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterFinancialCategories(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_financial_category', 'Create a new financial category.', {
    code: z.string().describe('Category code'),
    description: z.string().describe('Category description'),
    billType: z.enum(['PAYABLE', 'RECEIVABLE']).describe('Bill type'),
    operationType: z.enum(['REVENUE', 'EXPENSE', 'TRANSFER']).describe('Operation type'),
    type: z.enum(['STANDARD', 'SYSTEM']).optional().default('STANDARD').describe('Category type'),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional().default('ACTIVE').describe('Status'),
    parentKey: z.string().optional().describe('Parent category key'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createFinancialCategory(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_get_element_financial_categories', 'Get financial categories associated with an element.', {
    elementKey: z.string().describe('The element key'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async ({ elementKey, ...filter }) => {
    try {
        const result = await client.getElementFinancialCategories(elementKey, filter);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// PURCHASE ORDERS (ORDENS DE COMPRA)
// ============================================================
server.tool('aegro_get_purchase_order', 'Get a specific purchase order by its key.', {
    orderKey: z.string().describe('The purchase order key'),
}, async ({ orderKey }) => {
    try {
        const result = await client.getPurchaseOrder(orderKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_purchase_orders', 'Filter and list purchase orders with pagination.', {
    companyKeys: z.array(z.string()).optional().describe('Filter by company keys'),
    statuses: z.array(z.enum(['DRAFT', 'SENT', 'CONFIRMED', 'PARTIAL', 'RECEIVED', 'CANCELLED'])).optional().describe('Filter by status'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterPurchaseOrders(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// APPORTIONMENTS (RATEIOS)
// ============================================================
server.tool('aegro_get_apportionment', 'Get a specific apportionment by its key.', {
    apportionmentKey: z.string().describe('The apportionment key'),
}, async ({ apportionmentKey }) => {
    try {
        const result = await client.getApportionment(apportionmentKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_apportionments', 'Filter and list apportionments with pagination.', {
    cropGlebeKeys: z.array(z.string()).optional().describe('Filter by crop-glebe keys'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterApportionments(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// WEATHER LOGS (REGISTROS CLIMÁTICOS)
// ============================================================
server.tool('aegro_get_weather_log', 'Get a specific weather log by its key.', {
    logKey: z.string().describe('The weather log key'),
}, async ({ logKey }) => {
    try {
        const result = await client.getWeatherLog(logKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_weather_logs', 'Filter and list weather logs with pagination.', {
    glebeKeys: z.array(z.string()).optional().describe('Filter by glebe keys'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterWeatherLogs(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_weather_log', 'Create a new weather log.', {
    glebeKey: z.string().optional().describe('Glebe key'),
    logDate: z.string().describe('Log date (YYYY-MM-DD)'),
    temperature: z.number().optional().describe('Temperature (°C)'),
    humidity: z.number().optional().describe('Humidity (%)'),
    precipitation: z.number().optional().describe('Precipitation (mm)'),
    windSpeed: z.number().optional().describe('Wind speed'),
    observations: z.string().optional().describe('Observations'),
}, async (params) => {
    try {
        const result = await client.createWeatherLog(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// TAGS
// ============================================================
server.tool('aegro_get_tag', 'Get a specific tag by its key.', {
    tagKey: z.string().describe('The tag key'),
}, async ({ tagKey }) => {
    try {
        const result = await client.getTag(tagKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_tags', 'Filter and list tags with pagination.', {
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterTags(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_create_tag', 'Create a new tag.', {
    name: z.string().describe('Tag name'),
    color: z.string().optional().describe('Tag color (hex code)'),
}, async (params) => {
    try {
        const result = await client.createTag(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// CLIMATE RECORDS (REGISTROS CLIMÁTICOS LEGACY)
// ============================================================
server.tool('aegro_get_climate_record', 'Get a specific climate record by its key.', {
    recordKey: z.string().describe('The climate record key'),
}, async ({ recordKey }) => {
    try {
        const result = await client.getClimateRecord(recordKey);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_climate_records', 'Filter and list climate records with pagination.', {
    glebeKeys: z.array(z.string()).optional().describe('Filter by glebe keys'),
    startDate: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('End date (YYYY-MM-DD)'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterClimateRecords(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// ============================================================
// CATALOGS (CATÁLOGOS PÚBLICOS)
// ============================================================
server.tool('aegro_filter_catalog_elements', 'Filter and list public catalog elements (seeds, fertilizers, defensives, etc.).', {
    searchText: z.string().optional().describe('Search text'),
    categories: z.array(z.enum(['DEFENSIVE', 'FERTILIZER', 'ITEM', 'SEED', 'SERVICE', 'PEST'])).optional().describe('Filter by categories'),
    types: z.array(z.string()).optional().describe('Filter by types'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterCatalogElements(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
server.tool('aegro_filter_catalog_pests', 'Filter and list public catalog pests.', {
    searchText: z.string().optional().describe('Search text'),
    requiredPageNumber: z.number().optional().default(1).describe('Page number'),
    maximumItemsPerPageCount: z.number().optional().default(20).describe('Items per page'),
}, async (params) => {
    try {
        const result = await client.filterCatalogPests(params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: 'text', text: `Error: ${error}` }], isError: true };
    }
});
// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Aegro MCP Server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
