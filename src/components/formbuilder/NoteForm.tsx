import { FormEvent, useRef, useState } from "react";
import { Col, Form, Stack, Row, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../../App";

type NoteDataProps = {
  onSubmit: { data: NoteData };
};

function NoteForm({ onSubmit }: NoteDataProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownref = useRef<HTMLTextAreaElement>(null);
  const [selectedTag, setSelectedTag] = useState<Tag[]>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current?.value,
      markdown: markdownref.current?.value,
      tags: [],
    });
  };

  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                value={selectedTag?.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTag(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.id };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownref}
            required
            as="textarea"
            rows={15}></Form.Control>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
