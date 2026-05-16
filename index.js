```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Business Ideas Database
const businessIdeasDatabase = {
  agriculture: [
    { id: 1, name: "Cultivo Orgánico Vertical", sector: "agricultura", difficulty: "media", investment: 5000, profit_margin: 0.45 },
    { id: 2, name: "Venta de Semillas Certificadas", sector: "agricultura", difficulty: "baja", investment: 2000, profit_margin: 0.35 },
    { id: 3, name: "Procesamiento de Productos Agrícolas", sector: "agricultura", difficulty: "alta", investment: 15000, profit_margin: 0.55 },
    { id: 4, name: "Asesoría Agrícola Online", sector: "agricultura", difficulty: "baja", investment: 500, profit_margin: 0.70 },
    { id: 5, name: "Hidroponía Comercial", sector: "agricultura", difficulty: "alta", investment: 20000, profit_margin: 0.60 }
  ],
  commerce: [
    { id: 6, name: "Tienda E-commerce de Artesanías", sector: "commerce", difficulty: "media", investment: 3000, profit_margin: 0.50 },
    { id: 7, name: "Dropshipping de Tecnología", sector: "commerce", difficulty: "baja", investment: 1000, profit_margin: 0.25 },
    { id: 8, name: "Marketplace Especializado", sector: "commerce", difficulty: "alta", investment: 25000, profit_margin: 0.65 },
    { id: 9, name: "Venta de Productos Sostenibles", sector: "commerce", difficulty: "media", investment: 5000, profit_margin: 0.55 },
    { id: 10, name: "Franquicia de Retail", sector: "commerce", difficulty: "alta", investment: 50000, profit_margin: 0.40 }
  ],
  programming: [
    { id: 11, name: "Desarrollo de Apps SaaS", sector: "programming", difficulty: "alta", investment: 10000, profit_margin: 0.75 },
    { id: 12, name: "Agencia de Desarrollo Web", sector: "programming", difficulty: "media", investment: 5000, profit_margin: 0.60 },
    { id: 13, name: "Cursos de Programación Online", sector: "programming", difficulty: "media", investment: 2000, profit_margin: 0.80 },
    { id: 14, name: "Consultoría de Ciberseguridad", sector: "programming", difficulty: "alta", investment: 3000, profit_margin: 0.85 },
    { id: 15, name: "Automatización de Procesos RPA", sector: "programming", difficulty: "alta", investment: 8000, profit_margin: 0.70 }
  ]
};

// Validation Rules
const validationRules = {
  minInvestment: 100,
  maxInvestment: 100000,
  minProfitMargin: 0.10,
  maxProfitMargin: 0.95,
  minDifficulty: ['baja', 'media', 'alta'],
  requiredSectors: ['agriculture', 'commerce', 'programming']
};

// Business Idea Class
class BusinessIdea {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sector = data.sector;
    this.difficulty = data.difficulty;
    this.investment = data.investment;
    this.profit_margin = data.profit_margin;
    this.created_at = new Date();
    this.validation_result = null;
  }

  validate() {
    const errors = [];
    const warnings = [];

    // Validate name
    if (!this.name || this.name.length < 3) {
      errors.push("El nombre debe tener al menos 3 caracteres");
    }
    if (this.name.length > 100) {
      errors.push("El nombre no puede exceder 100 caracteres");
    }

    // Validate sector
    if (!validationRules.requiredSectors.includes(this.sector)) {
      errors.push(`Sector inválido. Debe ser uno de: ${validationRules.requiredSectors.join(', ')}`);
    }

    // Validate difficulty
    if (!validationRules.minDifficulty.includes(this.difficulty)) {
      errors.push(`Dificultad inválida. Debe ser: ${validationRules.minDifficulty.join(', ')}`);
    }

    // Validate investment
    if (this.investment < validationRules.minInvestment) {
      errors.push(`Inversión mínima: $${validationRules.minInvestment}`);
    }
    if (this.investment > validationRules.maxInvestment) {
      errors.push(`Inversión máxima: $${validationRules.maxInvestment}`);
    }

    // Validate profit margin
    if (this.profit_margin < validationRules.minProfitMargin) {
      errors.push(`Margen de ganancia mínimo: ${(validationRules.minProfitMargin * 100).toFixed(0)}%`);
    }
    if (this.profit_margin > validationRules.maxProfitMargin) {
      errors.push(`Margen de ganancia máximo: ${(validationRules.maxProfitMargin * 100).toFixed(0)}%`);
    }

    // Warnings
    if (this.investment > 20000) {
      warnings.push("Alta inversión inicial detectada");
    }
    if (this.difficulty ===