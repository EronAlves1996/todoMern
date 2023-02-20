/**
 * @generated SignedSource<<ddaa85d248671bdbd371e1d942724697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteTaskButtonMutation$variables = {
  taskId: string;
};
export type DeleteTaskButtonMutation$data = {
  readonly deleteTask: {
    readonly _id: string | null;
  } | null;
};
export type DeleteTaskButtonMutation = {
  response: DeleteTaskButtonMutation$data;
  variables: DeleteTaskButtonMutation$variables;
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
    "name": "deleteTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
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
    "name": "DeleteTaskButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteTaskButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5328c740117cd64810ee7e2b65816c64",
    "id": null,
    "metadata": {},
    "name": "DeleteTaskButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteTaskButtonMutation(\n  $taskId: String!\n) {\n  deleteTask(id: $taskId) {\n    _id\n  }\n}\n"
  }
};
})();

(node as any).hash = "50f88f909ac809f13a4c5b5f629398ee";

export default node;
