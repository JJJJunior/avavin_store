import React from "react";
import { getCollections } from "@/lib/actions";
import Link from "next/link";
import { CollectionType } from "@/lib/types";
import Image from "next/image";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p>No collecions found</p>
      ) : (
        <div className="flex items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection.id}`} key={collection.id}>
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-auto"
              />
              {collection.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
