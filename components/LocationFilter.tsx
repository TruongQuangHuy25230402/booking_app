"use client";
import qs from "query-string";
import { useEffect, useState } from "react";
import Container from "./Container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const LocationFilter = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const { getALlCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getALlCountries();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const countryStates = getCountryStates(country);
    if (countryStates) {
      setStates(countryStates);
      setState("");
      setCity("");
    }
    //eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    const stateCities = getStateCities(country, state);
    if (stateCities) {
      setCities(stateCities);
      setCity("");
    }
    //eslint-disable-next-line
  }, [country, state]);

  useEffect(() => {
    if (country === "" && state === "" && city === "")
      return router.push("/hotel-list");

    let currentQuery: any = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    if (country) {
      currentQuery = {
        ...currentQuery,
        country,
      };
    }

    if (state) {
      currentQuery = {
        ...currentQuery,
        state,
      };
    }

    if (city) {
      currentQuery = {
        ...currentQuery,
        city,
      };
    }

    if (state === "" && currentQuery.state) {
      delete currentQuery.state;
    }

    if (city === "" && currentQuery.city) {
      delete currentQuery.city;
    }

    const url = qs.stringifyUrl(
      {
        url: "/hotel-list",
        query: currentQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
    //eslint-disable-next-line
  }, [country, state, city]);

  const handleClear = () => {
    router.push("/hotel-list");
    setCountry("");
    setState("");
    setCity("");
  };

  return (
    <Container>
      <div className="flex gap-2 md:gap-4 items-center justify-center text-sm">
        <div>
          <Select onValueChange={(value) => setCountry(value)} value={country}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Country" />
            </SelectTrigger>

            <SelectContent>
              {countries.map((country) => {
                return (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select onValueChange={(value) => setState(value)} value={state}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="State" />
            </SelectTrigger>

            <SelectContent>
              {states.length > 0 &&
                states.map((state) => {
                  return (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select onValueChange={(value) => setCity(value)} value={city}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="City" />
            </SelectTrigger>

            <SelectContent>
              {cities.length > 0 &&
                cities.map((city) => {
                  return (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleClear()} variant="outline">
          Clear Filters
        </Button>
      </div>
    </Container>
  );
};

export default LocationFilter;
