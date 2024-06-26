package com.example.educationclick.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class TimeslotAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTimeslotAllPropertiesEquals(Timeslot expected, Timeslot actual) {
        assertTimeslotAutoGeneratedPropertiesEquals(expected, actual);
        assertTimeslotAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTimeslotAllUpdatablePropertiesEquals(Timeslot expected, Timeslot actual) {
        assertTimeslotUpdatableFieldsEquals(expected, actual);
        assertTimeslotUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTimeslotAutoGeneratedPropertiesEquals(Timeslot expected, Timeslot actual) {
        assertThat(expected)
            .as("Verify Timeslot auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTimeslotUpdatableFieldsEquals(Timeslot expected, Timeslot actual) {
        assertThat(expected)
            .as("Verify Timeslot relevant properties")
            .satisfies(e -> assertThat(e.getStartTime()).as("check startTime").isEqualTo(actual.getStartTime()))
            .satisfies(e -> assertThat(e.getEndTime()).as("check endTime").isEqualTo(actual.getEndTime()))
            .satisfies(e -> assertThat(e.getAvailability()).as("check availability").isEqualTo(actual.getAvailability()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTimeslotUpdatableRelationshipsEquals(Timeslot expected, Timeslot actual) {
        assertThat(expected)
            .as("Verify Timeslot relationships")
            .satisfies(e -> assertThat(e.getTeacher()).as("check teacher").isEqualTo(actual.getTeacher()));
    }
}
