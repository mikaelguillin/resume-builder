import React, { MouseEvent, ReactNode } from 'react';
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { Reorder, useDragControls } from 'framer-motion';
import { MdDelete, MdDragIndicator } from 'react-icons/md';
import { SectionItem } from '@/store/resume/resume.slice';

export const ResumeSectionItem = ({
    item,
    children,
    onClick,
    onDelete,
}: {
    item: SectionItem;
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLElement>) => void;
    onDelete: (e: MouseEvent<HTMLElement>) => void;
}) => {
    const dragControls = useDragControls();

    const handlePointerDown = (e: React.PointerEvent<SVGElement>) => {
        e.stopPropagation();
        dragControls.start(e);
    };

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={dragControls}
            as="div"
            style={{ position: 'relative' }}
            onClick={onClick}
        >
            <Box
                borderWidth={1}
                borderRadius="lg"
                padding={3}
                background="white"
                position="relative"
            >
                <Flex alignItems="center">
                    <Icon
                        cursor="move"
                        marginRight={3}
                        className="drag-handler"
                        onPointerDown={handlePointerDown}
                        as={MdDragIndicator}
                    />
                    {children}
                    <IconButton
                        aria-label="Supprimer"
                        variant="ghost"
                        icon={<Icon as={MdDelete} />}
                        onClick={onDelete}
                        marginLeft="auto"
                    />
                </Flex>
            </Box>
        </Reorder.Item>
    );
};
