import { createVNode, render, isVNode, type Component, type VNode } from "vue";
import Modal, { type ModalProps } from "./Modal.vue";

export interface ModalOptions extends Omit<ModalProps, "visible"> {
  content?: string | Component | VNode;
  contentProps?: Record<string, any>;
  onClose?: () => void;
  onAfterClose?: () => void;
}

export const showModal = (options: ModalOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const destroy = () => {
    render(null, container);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    options.onAfterClose?.();
  };

  const close = () => {
    renderComponent(false);
    options.onClose?.();
  };

  const renderComponent = (visible: boolean) => {
    const { content, contentProps, onClose: _onClose, onAfterClose: _onAfterClose, ...modalProps } = options;

    let defaultSlot: () => any;
    if (typeof content === "string") {
      defaultSlot = () => content;
    } else if (isVNode(content)) {
      defaultSlot = () => content;
    } else if (content) {
      defaultSlot = () => createVNode(content as Component, contentProps);
    } else {
      defaultSlot = () => null;
    }

    function onUpdateVisible(val: boolean) {
      if (!val) {
        renderComponent(false);
      }
    }

    const vnode = createVNode(
      Modal,
      {
        ...modalProps,
        visible,
        "onUpdate:visible": onUpdateVisible,
        onClose: options.onClose,
        onAfterClose: destroy,
      },
      { default: defaultSlot },
    );

    render(vnode, container);
  };

  renderComponent(true);

  return {
    close,
  };
};
