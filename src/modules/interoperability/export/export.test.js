import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import fs from 'fs';
import xlsx from 'node-xlsx';
import { createExport } from './export.service.js';

// Mock de la librairie node-xlsx
vi.mock('node-xlsx');

describe('createExport', () => {
  const fakeBuffer = Buffer.from('fake xlsx content');
  const filePath = '/tmp/export-test.xlsx';

  const testTransfers = [
    {
      date: '2025-01-15',
      amount: 1000,
      description: 'Virement salaire',
      sourceAccount: 'FR123456789',
      destinationAccount: 'FR987654321'
    },
    {
      date: '2025-01-16',
      amount: 500,
      description: 'Remboursement',
      sourceAccount: 'FR987654321',
      destinationAccount: 'FR123456789'
    }
  ];

  beforeEach(() => {
    // Mock xlsx.build
    xlsx.build.mockClear();
    xlsx.build.mockReturnValue(fakeBuffer);

    // Mock fs.promises.writeFile
    vi.spyOn(fs.promises, 'writeFile').mockResolvedValue();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Exos 4
  it('should call node-xlsx.build with correct data and write buffer to file', async () => {
    const result = await createExport(testTransfers, filePath);

    expect(xlsx.build).toHaveBeenCalledWith([{
      name: 'Transferts',
      data: [
        ['Date', 'Montant', 'Description', 'Compte Source', 'Compte Destination'],
        ['2025-01-15', 1000, 'Virement salaire', 'FR123456789', 'FR987654321'],
        ['2025-01-16', 500, 'Remboursement', 'FR987654321', 'FR123456789']
      ]
    }]);

    expect(fs.promises.writeFile).toHaveBeenCalledWith(filePath, fakeBuffer);
    expect(result).toBe(filePath);
  });

  it('should handle empty transfers array', async () => {
    const emptyTransfers = [];

    const result = await createExport(emptyTransfers, filePath);

    expect(xlsx.build).toHaveBeenCalledWith([{
      name: 'Transferts',
      data: [
        ['Date', 'Montant', 'Description', 'Compte Source', 'Compte Destination']
      ]
    }]);

    expect(fs.promises.writeFile).toHaveBeenCalledWith(filePath, fakeBuffer);
    expect(result).toBe(filePath);
  });
});
