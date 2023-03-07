import type { FieldPath, ErrorOption } from 'react-hook-form';

import type {
  ContractLibrary,
  FormFields,
  FormFieldsFlattenSourceCode,
  FormFieldsMultiPartFile,
  FormFieldsSourcify,
  FormFieldsStandardInput,
  FormFieldsVyperContract,
  FormFieldsVyperMultiPartFile,
} from './types';
import type { SmartContractVerificationMethod, SmartContractVerificationError } from 'types/api/contract';

import type { Params as FetchParams } from 'lib/hooks/useFetch';

export const SUPPORTED_VERIFICATION_METHODS: Array<SmartContractVerificationMethod> = [
  'flattened-code',
  'standard-input',
  'sourcify',
  'multi-part',
  'vyper-code',
  'vyper-multi-part',
];

export const METHOD_LABELS: Record<SmartContractVerificationMethod, string> = {
  'flattened-code': 'Solidity (Flattened source code)',
  'standard-input': 'Solidity (Standard JSON input)',
  sourcify: 'Solidity (Sourcify)',
  'multi-part': 'Solidity (Multi-part files)',
  'vyper-code': 'Vyper (Contract)',
  'vyper-multi-part': 'Vyper (Multi-part files)',
};

export const DEFAULT_VALUES = {
  'flattened-code': {
    method: {
      value: 'flattened-code' as const,
      label: METHOD_LABELS['flattened-code'],
    },
    is_yul: false,
    name: '',
    compiler: null,
    evm_version: null,
    is_optimization_enabled: true,
    optimization_runs: '200',
    code: '',
    autodetect_constructor_args: true,
    constructor_args: '',
    libraries: [],
  },
  'standard-input': {
    method: {
      value: 'standard-input' as const,
      label: METHOD_LABELS['standard-input'],
    },
    name: '',
    compiler: null,
    sources: [],
    autodetect_constructor_args: true,
    constructor_args: '',
  },
  sourcify: {
    method: {
      value: 'sourcify' as const,
      label: METHOD_LABELS.sourcify,
    },
    sources: [],
  },
  'multi-part': {
    method: {
      value: 'multi-part' as const,
      label: METHOD_LABELS['multi-part'],
    },
    compiler: null,
    evm_version: null,
    is_optimization_enabled: true,
    optimization_runs: 200,
    sources: [],
    libraries: [],
  },
  'vyper-code': {
    method: {
      value: 'vyper-code' as const,
      label: METHOD_LABELS['vyper-code'],
    },
    name: '',
    compiler: null,
    code: '',
    constructor_args: '',
  },
  'vyper-multi-part': {
    method: {
      value: 'vyper-multi-part' as const,
      label: METHOD_LABELS['vyper-multi-part'],
    },
    compiler: null,
    evm_version: null,
    sources: [],
  },
};

export function isValidVerificationMethod(method?: string): method is SmartContractVerificationMethod {
  return method && SUPPORTED_VERIFICATION_METHODS.includes(method) ? true : false;
}

export function sortVerificationMethods(methodA: SmartContractVerificationMethod, methodB: SmartContractVerificationMethod) {
  const indexA = SUPPORTED_VERIFICATION_METHODS.indexOf(methodA);
  const indexB = SUPPORTED_VERIFICATION_METHODS.indexOf(methodB);

  if (indexA > indexB) {
    return 1;
  }

  if (indexA < indexB) {
    return -1;
  }

  return 0;
}

export function prepareRequestBody(data: FormFields): FetchParams['body'] {
  switch (data.method.value) {
    case 'flattened-code': {
      const _data = data as FormFieldsFlattenSourceCode;
      return {
        compiler_version: _data.compiler?.value,
        source_code: _data.code,
        is_optimization_enabled: _data.is_optimization_enabled,
        is_yul_contract: _data.is_yul,
        optimization_runs: _data.optimization_runs,
        contract_name: _data.name,
        libraries: reduceLibrariesArray(_data.libraries),
        evm_version: _data.evm_version?.value,
        autodetect_constructor_args: _data.autodetect_constructor_args,
        constructor_args: _data.constructor_args,
      };
    }

    case 'standard-input': {
      const _data = data as FormFieldsStandardInput;

      const body = new FormData();
      body.set('compiler_version', _data.compiler?.value);
      body.set('contract_name', _data.name);
      body.set('autodetect_constructor_args', String(Boolean(_data.autodetect_constructor_args)));
      body.set('constructor_args', _data.constructor_args);
      addFilesToFormData(body, _data.sources);

      return body;
    }

    case 'sourcify': {
      const _data = data as FormFieldsSourcify;
      const body = new FormData();
      addFilesToFormData(body, _data.sources);
      _data.contract_index && body.set('chosen_contract_index', _data.contract_index.value);

      return body;
    }

    case 'multi-part': {
      const _data = data as FormFieldsMultiPartFile;

      const body = new FormData();
      body.set('compiler_version', _data.compiler?.value);
      body.set('evm_version', _data.evm_version?.value);
      body.set('is_optimization_enabled', String(Boolean(_data.is_optimization_enabled)));
      _data.is_optimization_enabled && body.set('optimization_runs', _data.optimization_runs);

      const libraries = reduceLibrariesArray(_data.libraries);
      libraries && body.set('libraries', JSON.stringify(libraries));
      addFilesToFormData(body, _data.sources);

      return body;
    }

    case 'vyper-code': {
      const _data = data as FormFieldsVyperContract;

      return {
        compiler_version: _data.compiler?.value,
        source_code: _data.code,
        contract_name: _data.name,
        constructor_args: _data.constructor_args,
      };
    }

    case 'vyper-multi-part': {
      const _data = data as FormFieldsVyperMultiPartFile;

      const body = new FormData();
      body.set('compiler_version', _data.compiler?.value);
      body.set('evm_version', _data.evm_version?.value);
      addFilesToFormData(body, _data.sources);

      return body;
    }

    default: {
      return {};
    }
  }
}

function reduceLibrariesArray(libraries: Array<ContractLibrary> | undefined) {
  if (!libraries || libraries.length === 0) {
    return;
  }

  return libraries.reduce<Record<string, string>>((result, item) => {
    result[item.name] = item.address;
    return result;
  }, {});
}

function addFilesToFormData(body: FormData, files: Array<File> | undefined) {
  if (!files) {
    return;
  }

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    body.set(`files[${ index }]`, file, file.name);
  }
}

const API_ERROR_TO_FORM_FIELD: Record<keyof SmartContractVerificationError, FieldPath<FormFields>> = {
  contract_source_code: 'code',
  files: 'sources',
  compiler_version: 'compiler',
  constructor_arguments: 'constructor_args',
  name: 'name',
};

export function formatSocketErrors(errors: SmartContractVerificationError): Array<[FieldPath<FormFields>, ErrorOption]> {
  return Object.entries(errors).map(([ key, value ]) => {
    return [ API_ERROR_TO_FORM_FIELD[key as keyof SmartContractVerificationError], { message: value.join(',') } ];
  });
}