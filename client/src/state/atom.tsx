import { atom } from "recoil";

const currentUserInfoAtom = atom({
  key: "currentUserInfo",
  default: "",
  dangerouslyAllowMutability: true,
});

const userDataAtom = atom<any[]>({
  key: "userData",
  default: [],
  dangerouslyAllowMutability: true,
});

export { currentUserInfoAtom, userDataAtom };
