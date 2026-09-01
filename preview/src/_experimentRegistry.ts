/** Build-time access to the canonical experiment registry. */

import * as fs from 'fs';
import * as path from 'path';

export type ExperimentKind = 'prototype' | 'surface' | 'deck';
export type ExperimentStatus = 'draft' | 'in-review' | 'ready' | 'archived';

export interface ExperimentRoute {
  id: string;
  title: string;
  query: string;
  selectors: string[];
}

export interface ExperimentDefinition {
  name: string;
  title: string;
  kind: ExperimentKind;
  status: ExperimentStatus;
  description: string;
  owner: string;
  updated: string;
  tags: string[];
  output: string;
  folder?: string;
  compare?: boolean;
  parent?: string;
  requiredAssets?: string[];
  assetDirectories?: { path: string; minimumFiles: number }[];
  knownGaps?: string[];
  routes: ExperimentRoute[];
}

interface ExperimentManifest {
  viewport: { width: number; height: number };
  experiments: ExperimentDefinition[];
}

const registryPath = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'experiments.json');
const manifest = JSON.parse(fs.readFileSync(registryPath, 'utf-8')) as ExperimentManifest;

export const experimentRegistry = manifest.experiments;

export const experimentCompareOptions = experimentRegistry
  .filter(experiment => experiment.compare !== false && experiment.kind !== 'deck')
  .map(experiment => ({
    slug: path.basename(experiment.output, '.html'),
    label: experiment.title,
  }));
