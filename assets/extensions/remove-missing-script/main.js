'use strict';

module.exports = {
    load() {},
    unload() {},
    
    methods: {
        async remove() {
            const selection = Editor.Selection.getSelected('node');

            if (!selection || selection.length === 0) {
                console.warn("Vui lòng chọn ít nhất 1 node trên Hierarchy!");
                return;
            }

            let removedCount = 0;

            for (const uuid of selection) {
                const node = await Editor.Message.request(
                    'scene',
                    'query-node',
                    uuid
                );

                if (!node || !node.__comps__) continue;

                const comps = node.__comps__;

                // Lặp ngược để xóa an toàn
                for (let i = comps.length - 1; i >= 0; i--) {
                    const comp = comps[i];
                    
                    if (comp.type === 'cc.MissingScript' || !comp.type) {
                        
                        // Chỉ cần lấy UUID của component là đủ
                        const compUuidStr = comp.value.uuid.value || comp.value.uuid; 
                        const nodeName = node.name.value || node.name;

                        console.log(`Đang tiến hành xóa Missing Script (ID: ${compUuidStr}) trên node ${nodeName}...`);
                        
                        try {
                            // ĐÃ SỬA: Truyền trực tiếp UUID của component vào trường "uuid"
                            await Editor.Message.request(
                                'scene',
                                'remove-component',
                                {
                                    uuid: compUuidStr
                                }
                            );
                            removedCount++;
                        } catch (err) {
                            console.error(`Lỗi khi xóa component trên node ${nodeName}:`, err);
                        }
                    }
                }
            }

            console.log(`Hoàn thành! Đã xóa thành công ${removedCount} missing scripts.`);
        }
    }
};