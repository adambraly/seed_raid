/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import Roster from '../js/components/Roster';

const roster = [
  {
    "username": "Thalestris",
    "nick": "Breq-Archimonde / Zogzog-Malorne",
    "id": "236544307203538946",
    "discriminator": 9923,
    "avatar": "21242e975b4939745fa19d117c08e2d7"
  },
  {
    "username": "Xzibo",
    "nick": "Xzibo-Quel'Thalas",
    "id": "245287465156345857",
    "discriminator": 8554,
    "avatar": "674e2aea1f330c2d50b674dd26a800a5"
  },
  {
    "username": "Sholenar-Silvermoon (Morsham-Dr)",
    "nick": null,
    "id": "254896989756588034",
    "discriminator": 1260,
    "avatar": "307f47c705024055f1d46849bcdbaae2"
  },
  {
    "username": "kazpi",
    "nick": "Kazpi-Defias-Brotherhood",
    "id": "271690587185479681",
    "discriminator": 1268,
    "avatar": "c48139ccc1e5f5469e89053eaee8f6c1"
  },
  {
    "username": "pacioaca12",
    "nick": "Darkrevenger-Frostmane",
    "id": "292349766631948289",
    "discriminator": 1544,
    "avatar": "65c0f2f20dd5983009a1aa251ce7f0e2"
  },
  {
    "username": "Jinx",
    "nick": "Thal (Abuse-Khadgar/Visagasus-S)",
    "id": "198956678777929728",
    "discriminator": 4164,
    "avatar": "ac6aa9c954a418c14d1f83845378ef66"
  },
  {
    "username": "Predator",
    "nick": "Kiseijuu-DunModr",
    "id": "140568898427682816",
    "discriminator": 1585,
    "avatar": "bf62bc0f789fc9827e0c048fa6f3fdef"
  },
  {
    "username": "Monra",
    "nick": "Monra(DefiasBrotherhood)",
    "id": "215480785711398912",
    "discriminator": 9372,
    "avatar": "3a6cb5446fb4f9766fc430233ea4b617"
  },
  {
    "username": "Samurai",
    "nick": "Woofbark-DieAldor",
    "id": "235829665065861132",
    "discriminator": 2114,
    "avatar": "68141c453cc73a02087b81a8d49b6b68"
  }
];

const smallRoster = [
  {
    "username": "Thalestris",
    "nick": "Breq-Archimonde / Zogzog-Malorne",
    "id": "236544307203538946",
    "discriminator": 9923,
    "avatar": "21242e975b4939745fa19d117c08e2d7"
  },
  {
    "username": "Xzibo",
    "nick": "Xzibo-Quel'Thalas",
    "id": "245287465156345857",
    "discriminator": 8554,
    "avatar": "674e2aea1f330c2d50b674dd26a800a5"
  },
  {
    "username": "Sholenar-Silvermoon (Morsham-Dr)",
    "nick": null,
    "id": "254896989756588034",
    "discriminator": 1260,
    "avatar": "307f47c705024055f1d46849bcdbaae2"
  },
];

storiesOf('Roster', module)
  .add('one roster', () => (
    <Roster
      roster={roster}
    />
  )).add('roster with dummies', () => (
    <Roster
      roster={smallRoster}
    />
  ));
