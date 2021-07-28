import { RequestHandler } from "express";
import Item from "../models/Item";

//@Route    Post api/items
//@desc     Create new item
//@access   Private
export const createItem: RequestHandler = async (req, res) => {
  const { name, description, imgUrl, stock } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      imgUrl,
      stock,
    });
    const itemSaved = await newItem.save();
    return res.status(200).json(itemSaved);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "A ocurrido un error con tu petición." });
  }
};

//@Route    Get api/items
//@desc     Get all items
//@access   Public
export const getItems: RequestHandler = async (req, res) => {
  try {
    const items = Item.find().sort({ created_At: -1 });
    return res.status(200).json(items);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "A ocurrido un error con tu petición." });
  }
};

//@Route    Get api/item/:id
//@desc     Get specific item
//@access   Public
export const getItemById: RequestHandler = async (req, res) => {
  try {
    const item = Item.findById(req.params.id);
    return res.status(200).json(item);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "A ocurrido un error con tu petición." });
  }
};

//@Route    Update api/item/:id
//@desc     Update item
//@access   Private
export const updateItemById: RequestHandler = async (req, res) => {
  const { name, description, imgUrl, stock } = req.body;

  try {
    const item = Item.findById(req.params.id);
    if (!item) {
      res.status(400).json({ msg: "Item no existe." });
    }
    const itemToUpdate = {
      name,
      description,
      imgUrl,
      stock,
    };
    const itemUpdated = Item.findByIdAndUpdate(req.params.id, itemToUpdate, {
      new: true,
    });
    return res.status(200).json(itemUpdated);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "A ocurrido un error con tu petición." });
  }
};

//@Route    Delete api/item/:id
//@desc     Delete item
//@access   Private
export const deleteItemById: RequestHandler = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    return res.status(200).json({ deletedItem });
  } catch (err) {
    return res
      .status(400)
      .json({ errors: [{ mgs: "A ocurrido un error con tu petición." }] });
  }
};
