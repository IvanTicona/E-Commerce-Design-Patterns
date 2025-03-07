import { useState } from "react";
import {
  Card,
  CardFooter,
  Image,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Product, products } from "../data/products";

import DefaultLayout from "@/layouts/default";

const OffersPage = () => {
  return (
    <DefaultLayout>
      <h1>Offers</h1>
    </DefaultLayout>
  );
};

export default OffersPage;
