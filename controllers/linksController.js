import linkModel from "../models/linkModel.js";

const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await linkModel.find();
      res.json({ links });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },




  getById: async (req, res) => {
    try {
      const link = await linkModel.findById(req.params.id);
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl } = req.body;
    try {
      const newLink = await linkModel.create({ originalUrl });
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await linkModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await linkModel.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redirectLink: async (req, res) => {
    try {
      const link = await linkModel.findById(req.params.id);
      if (!link) return res.status(404).send('Link not found');

      // בדיקת פרמטר target
      const targetParamValue = req.query[link.targetParamName] || '';

      // עדכון הקליקים
      const click = {
        ipAddress: req.ip,
        targetParamValue
      };
      link.clicks.push(click);
      await link.save();

      res.redirect(link.originalUrl,301);

    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getClicksByTarget: async (req, res) => {
    try {
      const link = await linkModel.findById(req.params.id);
      if (!link) return res.status(404).send('Link not found');

      const clicksByTarget = link.clicks.reduce((acc, click) => {
        const target = click.targetParamValue || 'unknown';
        if (!acc[target]) {
          acc[target] = 0;
        }
        acc[target]++;
        return acc;
      }, {});

      res.status(200).send(clicksByTarget);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default LinksController;
