/**
 * @generated SignedSource<<34edf58dca298ef927ad82cbf77405fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskInput = {
  creationDate: any;
  deadline: any;
  description: string;
  isCompleted: boolean;
};
export type EditTaskFormMutation$variables = {
  id: string;
  task: TaskInput;
};
export type EditTaskFormMutation$data = {
  readonly updateTask: {
    readonly _id: string | null;
    readonly deadline: any;
    readonly description: string;
    readonly isCompleted: boolean;
  } | null;
};
export type EditTaskFormMutation = {
  response: EditTaskFormMutation$data;
  variables: EditTaskFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "task"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "task",
        "variableName": "task"
      }
    ],
    "concreteType": "TaskOutput",
    "kind": "LinkedField",
    "name": "updateTask",
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
    "name": "EditTaskFormMutation",
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
    "name": "EditTaskFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7ec93a6afe5d64d8db3b18338a6cc4c9",
    "id": null,
    "metadata": {},
    "name": "EditTaskFormMutation",
    "operationKind": "mutation",
    "text": "mutation EditTaskFormMutation(\n  $task: TaskInput!\n  $id: String!\n) {\n  updateTask(id: $id, task: $task) {\n    _id\n    description\n    deadline\n    isCompleted\n  }\n}\n"
  }
};
})();

(node as any).hash = "8fd5c8c95c8697a73f1d58a86f6d18af";

export default node;
