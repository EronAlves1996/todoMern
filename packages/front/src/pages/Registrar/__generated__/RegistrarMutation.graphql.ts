/**
 * @generated SignedSource<<8e4cadfc4767f2fa5bfb72a4749836fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserInput = {
  email: string;
  name: string;
  password: string;
};
export type RegistrarMutation$variables = {
  user?: UserInput | null;
};
export type RegistrarMutation$data = {
  readonly createUser: {
    readonly _id: string;
  } | null;
};
export type RegistrarMutation = {
  response: RegistrarMutation$data;
  variables: RegistrarMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "concreteType": "UserOutput",
    "kind": "LinkedField",
    "name": "createUser",
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
    "name": "RegistrarMutation",
    "selections": (v1/*: any*/),
    "type": "mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegistrarMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c8bd662cfa9848a8d232c478a5116869",
    "id": null,
    "metadata": {},
    "name": "RegistrarMutation",
    "operationKind": "mutation",
    "text": "mutation RegistrarMutation(\n  $user: UserInput\n) {\n  createUser(user: $user) {\n    _id\n  }\n}\n"
  }
};
})();

(node as any).hash = "52e8c1afe263e41348dffb46c9d0e5bc";

export default node;
