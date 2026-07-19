import { useEffect, useMemo, useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { getOpenServiceRequests } from "../../services/serviceRequest.service";
import BuyerRequestCard from "../service/BuyerRequestCard";

const categories = [
  "All",
  "Harvesting",
  "Seeding",
  "Ploughing",
  "Land Preparation",
  "Spraying",
  "Transportation",
  "Irrigation",
  "Fertilizer Application",
  "Threshing",
  "Crop Cutting",
  "Other",
];

export default function BuyerRequests() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const { data } = await getOpenServiceRequests();

      setRequests(data.requests || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load nearby requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = useMemo(() => {
    return requests.filter((req) => {
      const matchSearch =
        req.title?.toLowerCase().includes(search.toLowerCase()) ||
        req.location?.district
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        req.category === category;

      return matchSearch && matchCategory;
    });
  }, [requests, search, category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <ClipboardList
            className="text-emerald-600"
            size={28}
          />

          <div>

            <h1  className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent" >
              
              Buyer Requests
            </h1>

            <p className="mt-2 text-emerald-900/60 dark:text-emerald-300/70">
              Nearby farming jobs from buyers in your district.
            </p>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mb-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            className="w-full rounded-xl border bg-background pl-11 pr-4 py-3"
            placeholder="Search request..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          className="rounded-xl border bg-background px-4"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Content */}

      {loading ? (

        <div className="text-center py-20">
          Loading requests...
        </div>

      ) : filtered.length === 0 ? (

        <div className="rounded-3xl border bg-card p-16 text-center">

          <ClipboardList
            size={56}
            className="mx-auto mb-4 opacity-30"
          />

          <h2 className="text-2xl font-bold">
            No Nearby Requests
          </h2>

          <p className="text-muted-foreground mt-2">
            Buyer requests in your district
            will appear here.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((request) => (

            <BuyerRequestCard
              key={request._id}
              req={request}
            />

          ))}

        </div>

      )}

    </div>
  );
}