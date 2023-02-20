/**
 * @generated SignedSource<<3b9c7bd0e4b46e3753e54aa9a76e09d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TaskDisplayQuery$variables = {
  taskId: string;
};
export type TaskDisplayQuery$data = {
  readonly loadTask: {
    readonly _id: string | null;
    readonly creationDate: any;
    readonly deadline: any;
    readonly description: string;
    readonly isCompleted: boolean;
  } | null;
};
export type TaskDisplayQuery = {
  response: TaskDisplayQuery$data;
  variables: TaskDisplayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "taskId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "taskId"
      }
    ],
    "concreteType": "TaskOutput",
    "kind": "LinkedField",
    "name": "loadTask",
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
        "name": "deadline",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCompleted",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "creationDate",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskDisplayQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskDisplayQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d297fe0879651995d36799ed619387ec",
    "id": null,
    "metadata": {},
    "name": "TaskDisplayQuery",
    "operationKind": "query",
    "text": "query TaskDisplayQuery(\n  $taskId: String!\n) {\n  loadTask(id: $taskId) {\n    _id\n    description\n    deadline\n    isCompleted\n    creationDate\n  }\n}\n"
  }
};
})();

(node as any).hash = "2a2899bb2f42deab21027ea3ea918174";

export default node;
