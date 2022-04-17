import { encode } from "base-64";

export const prepareCode = (string) => {
   return encode(string);
}

/*
#include <bits/stdc++.h>
using namespace std;

int main() {
    String name;
    cin>>name;
    cout << "Hello " + name;
    return 0;
}
*/