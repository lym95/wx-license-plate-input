Page({
  data: {
    show: false,
    post: {
      plate: [""],
    },
    plateIndex: 0,
  },
  onExport(e) {
    const { plate } = e.detail;
    this.setData({
      [`post.plate[${this.data.plateIndex}]`]: plate,
      show: false,
    });
  },
  addPlate() {
    const { plate } = this.data.post;
    plate.push("");
    this.setData({
      "post.plate": plate,
      plateIndex: plate.length - 1,
    });
  },
  delPlate(e) {
    const index = e.currentTarget.dataset.index;
    const { plate } = this.data.post;
    plate.splice(index, 1);
    this.setData({
      "post.plate": plate,
      plateIndex: plate.length - 1,
    });
  },
  onOpen(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ plateIndex: index, show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
});
