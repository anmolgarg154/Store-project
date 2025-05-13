import { prisma } from "../utils/prismaClient.js";

const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const store = await prisma.store.create({
      data: { name, email, address },
    });

    return res.status(201).json({
      message: "Store created successfully",
      success: true,
      data: store,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const getAllStore = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true,
      },
    });

    return res.status(200).json({
      message: "Stores fetched successfully",
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const addRating = async (req, res) => {
  try {
    const { storeId, rate, userId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const store = await prisma.store.findUnique({
      where: { id: Number(storeId) },
    });

    if (!user || !store) {
      return res.status(404).json({
        message: "User or Store not found",
        success: false,
      });
    }

    const rating = await prisma.rating.create({
      data: {
        rate,
        user: { connect: { id: userId } },
        store: { connect: { id: Number(storeId) } },
      },
    });

    return res.status(201).json({
      message: "Rating added successfully",
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export { createStore, getAllStore, addRating };
