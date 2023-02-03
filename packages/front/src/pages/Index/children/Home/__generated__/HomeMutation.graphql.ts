/**
 * @generated SignedSource<<b1ad43046680fcb02af51671cdb8cb8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type HomeMutation$variables = {
  deadline: any;
  description: string;
};
export type HomeMutation$data = {
  readonly createTask: {
    readonly _id: string | null;
    readonly creationDate: any;
    readonly deadline: any;
    readonly description: string;
    readonly isCompleted: boolean;
  } | null;
};
export type HomeMutation = {
  response: HomeMutation$data;
  variables: HomeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "deadline"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "deadline",
        "variableName": "deadline"
      },
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      }
    ],
    "concreteType": "taskOutput",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "creationDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deadline",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCompleted",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "HomeMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3c1325642262084607f9a9eea3c4ae15",
    "id": null,
    "metadata": {},
    "name": "HomeMutation",
    "operationKind": "mutation",
    "text": "mutation HomeMutation(\n  $description: String!\n  $deadline: Date!\n) {\n  createTask(description: $description, deadline: $deadline) {\n    _id\n    description\n    creationDate\n    deadline\n    isCompleted\n  }\n}\n"
  }
};
})();

(node as any).hash = "8add83ca52f4fbf6c7b0504c17e60ba4";

export default node;
