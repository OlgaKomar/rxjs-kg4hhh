import { combineLatest, fromEvent, Observable, of } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

console.clear();

const streetInput = document.getElementById("inputStreet1");
const houseFrameInput = document.getElementById("inputHouseFrame1");
const houseNumberInput = document.getElementById("inputHouseNumber1");
const errorMsgContainer = document.getElementById("addressInvalidMessage");

const isErrorVisible$: Observable<boolean> = combineLatest([
  fromEvent(streetInput, "change").pipe(
    map(e => (e.target as HTMLInputElement).value),
    filter(Boolean)
  ),
  fromEvent(houseFrameInput, "change").pipe(
    map(e => (e.target as HTMLInputElement).value),
    filter(Boolean)
  ),
  fromEvent(houseNumberInput, "change").pipe(
    map(e => (e.target as HTMLInputElement).value),
    filter(Boolean)
  )
]).pipe(
  switchMap(([street, houseFrame, houseNumber]: [string, string, string]) => {
    return fakeCheckAddressValidity({ street, houseNumber, houseFrame });
  })
);

interface Address {
  street: string;
  houseFrame: string;
  houseNumber: string;
}

toggleErrorMsgVisibility(false);

function toggleErrorMsgVisibility(value) {
  errorMsgContainer.style.display = value ? "block" : "none";
}

function fakeCheckAddressValidity({
  street,
  houseNumber
}: Address): Observable<boolean> {
  if (street.toLowerCase() === "дорошенка") {
    return of(false);
  }
  if (+houseNumber < 10) {
    return of(false);
  }
  return of(true);
}
